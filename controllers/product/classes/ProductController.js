const fs = require('fs')
const path = require('path')
const ProductInventory = require('../../../models/stock/ProductInventory')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')
const { getRatingStarStatisticsHelper } = require('../../../helpers/social/review/ratingStatistics')

class ProductController {

    constructor(name, model, variantModel) {
        this.name = name
        this.model = model
        this.variantModel = variantModel
    }

    // get all products
    async getAllProducts(req, res) {

        const products = await this.model.find().lean().exec()

        if (!products.length) {
            return res.status(404).json({ message: `No ${this.name}s found` })
        }

        console.log('kh hieu vl')

        return res.json(products)
    }

    // create new product
    async createNewProduct(req, res) {

        const { name, brand } = req.body

        const product = await this.model.create({
            name,
            brand
        })

        return res.status(201).json({ message: `${capitalizeFirstLetter(this.name)} is created` })
    }

    // update product
    async updateProduct(req, res) {

        const { name, brand, product } = req.body

        product.name = name
        product.brand = brand

        await product.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} is updated` })
    }

    // delete product
    async deleteProduct(req, res) {

        const { product } = req.body
        const folderName = standardizeFolderNames(product.name)

        await product.deleteOne()

        // remove product directory if it's exist
        const fileDest = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', folderName)

        if (fs.existsSync(fileDest)) {
            fs.rmSync(fileDest, { recursive: true, force: true })
        }

        return res.json({ message: `${capitalizeFirstLetter(this.name)} is deleted` })
    }

    // get product
    getProduct(req, res) {

        const { product } = req.body

        return res.json(product.toObject())
    }

    // get full products in stock
    async getProductsInStock(query, name, model, variantModel, fields, forFilter) {

        // let { page } = query

        // if (!page) {
        //     page = 1
        // }

        // page = parseInt(page)

        // const pageSize = 20
        // const endIndex = page * pageSize
        // const startIndex = endIndex - pageSize

        // find all products
        const products = await model.find().select('-createdAt -updatedAt -__v').lean().exec()

        if (!products.length) {
            return { error: { status: 404, message: `No ${name} found` } }
        }

        const productsToRemove = []

        for (const product of products) {

            const productVariants = await variantModel.find({ [name]: product._id, status: true }).select(`-${name} -createdAt -updatedAt -__v`).lean().exec()

            if (!productVariants.length) {
                productsToRemove.push(product._id)
            }

            for (const field of fields) {
                product[field] = []
            }

            // find and asign quantity for each variants
            for (const productVariant of productVariants) {

                const productInventory = await ProductInventory.findOne({ product: productVariant._id }).lean().exec()

                productVariant.quantity = productInventory.quantity
                for (const field of fields) {
                    product[field].push(productVariant[field])
                }

            }

            // create variants array
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

            for (const field of fields) {
                product[field] = [...new Set(product[field])]
            }
            product.ratingStarStatistics = ratingStarStatistics
        }

        const productsWithVariants = products.filter(product => !productsToRemove.includes(product._id))

        if (!productsWithVariants.length) {
            return { error: { status: 404, message: `No ${name} found` } }
        }

        // server products
        let servedProducts = productsWithVariants

        // if (forFilter) {
        //     productsWithVariants.slice(startIndex, endIndex)
        // }

        return { data: servedProducts }
    }

    // get full product infos --- fullInfos
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
        product.rams = []
        product.hardDrives = []
        product.colors = []

        for (const productVariant of productVariants) {

            // find quantity in product inventories
            const productInventory = await ProductInventory.findOne({ product: productVariant._id }).lean().exec()

            // asign quantity
            productVariant.quantity = productInventory.quantity

            product.rams.push(productVariant.ram)
            product.hardDrives.push(productVariant.hardDrive)
            product.colors.push(productVariant.color)
        }

        product.rams = [...new Set(product.rams)]
        product.hardDrives = [...new Set(product.hardDrives)]
        product.colors = [...new Set(product.colors)]
        product.variants = productVariants

        // // caculate rating star stastistics
        // const ratingStarStatistics = await getRatingStarStatisticsHelper(product._id)
        // delete ratingStarStatistics.stars

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

    // get full products infos --- fullInfos
    async getFullProductsInfos(req, res) {

        const fields = ['ram', 'hardDrive', 'color']

        const servedProducts = await this.getProductsInStock(req.query, this.name, this.model, this.variantModel, fields)

        if (servedProducts.error) {
            return res.status(servedProducts.error.status).json({ message: servedProducts.error.message })
        }

        return res.json(servedProducts.data)
    }

    // product filter
    async productFilter(req, res) {

        let { brand, minPrice, maxPrice, ram, hardDrive } = req.query

        const fields = ['ram', 'hardDrive', 'color']

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

                if (ram) {
                    if (productVariant.ram !== ram) return false
                } 
                
                if (hardDrive) {
                    if (productVariant.hardDrive !== hardDrive) return false
                }

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
            const rams = []
            const hardDrives = []
            const colors = []
            filterVariants.forEach(variant => {
                rams.push(variant.ram)
                hardDrives.push(variant.hardDrive)
                colors.push(variant.color)
            })

            product.ram = [...new Set(rams)]
            product.hardDrive = [...new Set(hardDrives)]
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

module.exports = ProductController