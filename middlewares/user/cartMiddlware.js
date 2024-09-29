const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const ProductInventory = require('../../models/stock/ProductInventory')
const Cart = require('../../models/user/Cart')

// check all required fields
const checkRequiredFields = (req, res, next) => {
    
    const { productVariantId, quantity } = req.body

    if (!productVariantId || !quantity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check whether product (variant) id is exist in inventory or not
const checkIdExsitenceInInvent = asyncHandler(async (req, res, next) => {

    const { productVariantId } = req.body

    if (!mongoose.Types.ObjectId.isValid(productVariantId)) {
        return res.status(404).json({ message: 'Product not found in inventory' })
    }

    const productInventory = await ProductInventory.findOne({ product: productVariantId }).exec()

    if (!productInventory) {
        return res.status(404).json({ message: 'Product not found in inventory' })
    }

    // asign product inventory to req.body if it's exist in inventoty
    req.body.productInventory = productInventory

    return next()
})

// check whether quantity is valid or not
const checkQuantity = (req, res, next) => {

    const { quantity, productInventory } = req.body

    if (productInventory.quantity < quantity) {
        return res.status(400).json({ message: 'Imvalid quantity of product. Quantity is larger than inventory' })
    }

    return next()
}

// check whether product (variant) is exist or not in user cart
const checkProductExistenceInCart = asyncHandler(async (req, res, next) => {

    const { cartId } = req.params

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(404).json({ message: 'Product not found in cart' })
    }

    const productCart = await Cart.findOne({ _id: cartId }).exec()
    
    if (!productCart) {
        return res.status(404).json({ message: 'Product not found in cart' })
    }

    // asign productCart to req.body
    req.body.productCart = productCart

    return next()
})

module.exports = {
    checkRequiredFields,
    checkIdExsitenceInInvent,
    checkQuantity,
    checkProductExistenceInCart
}