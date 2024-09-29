const asyncHandler = require('express-async-handler')
const ProductInventory = require('../../models/stock/ProductInventory')
const { getRatingStarStatisticsHelper } = require('../../helpers/social/review/ratingStatistics')

// get full information for products
const getProductsInStock = asyncHandler(async (query, name, model, variantModel, fields) => {

    let { page } = query

    if (!page) {
        page = 1
    }

    page = parseInt(page)

    const pageSize = 20
    const endIndex = page * pageSize
    const startIndex = endIndex - pageSize

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
            break
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
        const ratingStarStatistics = await getRatingStarStatisticsHelper(product._id)
        delete ratingStarStatistics.stars
        for (const field of fields) {
            product[field] = [...new Set(product[field])]
        }
        product.ratingStarStatistics = ratingStarStatistics
    }

    const productsWithVariants = products.filter(product => !productsToRemove.includes(product._id))

    // server products
    const servedProducts = productsWithVariants.slice(startIndex, endIndex)

    return { data: servedProducts }
})

module.exports = {
    getProductsInStock
}