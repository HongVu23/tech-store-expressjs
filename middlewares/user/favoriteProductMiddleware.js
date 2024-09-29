const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const ProductInventory = require('../../models/stock/ProductInventory')
const FavoriteProduct = require('../../models/user/FavoriteProduct')
const productTypes = require('../../configs/productTypes')

// check required fields
const checkRequiredFields = (req, res, next) => {

    const { productId } = req.body

    if (!productId) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check whether product is exsit or not
const checkProductExistence = asyncHandler(async (req, res, next) => {

    const { productId } = req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: 'Product not found' })
    }

    let foundProduct

    for (const productType of productTypes) {
        
        const product = await productType.model.findOne({ _id: productId }).lean().exec()

        if (product) {
            foundProduct = product
            foundProduct.productType = productType.name
            break
        }
    }

    if (!foundProduct) {
        return res.status(404).json({ message: 'Product not found' })
    }

    // asign product to req.body
    req.body.product = foundProduct

    return next()
})

// check duplicate favorite product
const checkDuplicateProduct = asyncHandler(async (req, res, next) => {

    const { productId } = req.body

    const duplicate = await FavoriteProduct.findOne({ product: productId }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate favorite product' })
    }

    return next()
})

// check whether product is exist in favorite product
const checkProductExistenceInFP = asyncHandler(async (req, res, next) => {

    const { favoriteProductId } = req.params

    if (!mongoose.Types.ObjectId.isValid(favoriteProductId)) {
        return res.status(404).json({ message: 'Product not found in favorite product' })
    }

    const favoriteProduct = await FavoriteProduct.findOne({ _id: favoriteProductId }).exec()

    if (!favoriteProduct) {
        return res.status(404).json({ message: 'Product not found in favorite product' })
    }

    // asign favorite product to req.body
    req.body.favoriteProduct = favoriteProduct

    return next()
})

module.exports = {
    checkRequiredFields,
    checkProductExistence,
    checkDuplicateProduct,
    checkProductExistenceInFP
}