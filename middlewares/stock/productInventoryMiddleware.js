const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const ProductInventory = require('../../models/stock/ProductInventory')

// check product variant existence or not
const checkVariantIdExistence = asyncHandler(async (req, res, next) => {

    const { productVariantId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productVariantId)) {
        return res.status(404).json({ message: 'Not found in Inventory' })
    }

    const productVariant = await ProductInventory.findOne({ product: productVariantId }).exec()

    if (!productVariant) {
        return res.status(404).json({ message: 'Not found in Inventory' })
    }

    // aisgn to the request boy
    req.body.productVariant = productVariant

    return next()
})

module.exports = {
    checkVariantIdExistence
}