const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const MainProductController = require('../../../classes/MainProductController')
const ProductInventory = require('../../../../../../models/stock/ProductInventory')
const { getRatingStarStatisticsHelper } = require('../../../../../../helpers/social/review/ratingStatistics')

class SmartWatchController extends MainProductController {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchVariant)
    }

    // @override
    // get full products infos --- fullInfos
    async getFullProductsInfos(req, res) {

        const fields = ['color']

        const servedProducts = await this.getProductsInStock(req.query, this.name, this.model, this.variantModel, fields)

        if (servedProducts.error) {
            return res.status(servedProducts.error.status).json({ message: servedProducts.error.message })
        }

        return res.json(servedProducts.data)
    }

    // @override
    // get full product info --- fullProductInfo
    async getFullProductInfos(req, res) {

        let { product } = req.body
        product = product.toObject()
        delete product.createdAt
        delete product.updatedAt
        delete product.__v

        // find all product variants
        const productVariants = await this.variantModel.find({ [this.name]: product._id, status: true }).select('-createdAt -updatedAt -__v').lean().exec()

        if (!productVariants.length) {
            return res.status(404).json({ message: 'No informations found' })
        }

        // agin values
        product.colors = []

        for (const productVariant of productVariants) {

            // find quantity in product inventories
            const productInventory = await ProductInventory.findOne({ product: productVariant._id }).lean().exec()

            // asign quantity
            productVariant.quantity = productInventory.quantity

            product.colors.push(productVariant.color)
        }

        product.colors = [...new Set(product.colors)]
        product.variants = productVariants

        // get rating star statistics for product
        let ratingStarStatistics
        const ratingStarStatisticsResult = await getRatingStarStatisticsHelper(product._id)

        if (ratingStarStatisticsResult.isValid) {
            delete ratingStarStatisticsResult.data.stars
            ratingStarStatistics = ratingStarStatisticsResult.data
        } else {
            ratingStarStatistics = {
                totalStars: 0,
                averageRating: 0
            }
        }

        product.ratingStarStatistics = ratingStarStatistics

        return res.json(product)
    }

    // @override
    // product filter
    async productFilter(req, res) {

        let { brand, minPrice, maxPrice } = req.query

        const fields = ['color']

        let servedProducts = await this.getProductsInStock(req.query, this.name, this.model, this.variantModel, fields, true)

        if (servedProducts.error) {
            return res.status(servedProducts.error.status).json({ message: servedProducts.error.message })
        }

        servedProducts = servedProducts.data

        // filter
        const filterProducts = servedProducts.filter(product => {

            if (brand) {
                if (product.brand !== brand) {
                    return false
                }
            }

            // filter variants
            const filterVariants = product.variants.filter(productVariant => {

                if (maxPrice || minPrice) {
                    if (maxPrice && minPrice) {
                        maxPrice = parseInt(maxPrice)
                        minPrice = parseInt(minPrice)
                        if (!(maxPrice >= productVariant.price && minPrice <= productVariant.price)) return false
                    } else if (maxPrice) {
                        maxPrice = parseInt(maxPrice)
                        if (maxPrice < productVariant.price) return false
                    } else if (minPrice) {
                        minPrice = parseInt(minPrice)
                        if (minPrice > productVariant.price) return false
                    }
                }

                return true
            })

            // if variants is empty after filter
            if (!filterVariants.length) {
                return false
            }

            // re-asign info arrays
            const colors = []
            filterVariants.forEach(variant => {
                colors.push(variant.color)
            })

            product.color = [...new Set(colors)]
            product.variants = filterVariants

            return true
        })

        // check whether filter produtcs is empty
        if (!filterProducts.length) {
            return res.status(404).json({ message: `No ${this.name}s found` })
        }

        return res.json(filterProducts)
    }
}

module.exports = SmartWatchController