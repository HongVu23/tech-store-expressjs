const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User')
const productVariantTypes = require('../../configs/productVariantTypes')
const Order = require('../../models/order/Order')
const ProductInventory = require('../../models/stock/ProductInventory')

// check all required fields
const checkRequiredFields = (req, res, next) => {

    const { orderItems, paymentMethod } = req.body

    // check whether order items array is empty or not
    if (!orderItems?.length || !paymentMethod) {
        return res.status(400).json({ message: 'Order items and payment method are required' })
    }

    return next()
}

// check whether order item is valid or not
const checkValidOrderItems = asyncHandler(async (req, res, next) => {

    const { orderItems } = req.body

    for (const orderItem of orderItems) {

        // check whether order item is exist or not
        if (!mongoose.Types.ObjectId.isValid(orderItem.productVariantId)) {
            return res.status(404).json({ message: `Order item(${orderItem.productVariantId}) not found` })
        }

        let isExist = false

        for (const productVariantType of productVariantTypes) {

            const productVariant = await productVariantType.model.findOne({ _id: orderItem.productVariantId }).exec()

            if (productVariant) {
                isExist = true
                orderItem.productVariantInfo = { productVariant, productVariantType: productVariantType.name }
                break
            }
        }

        if (!isExist) {
            return res.status(404).json({ message: `Order item(${orderItem.productVariantId}) not found` })
        }

        // check whether quantity is valid or not
        const productInventory = await ProductInventory.findOne({ product: orderItem.productVariantId }).lean().exec()

        if (orderItem.quantity > productInventory.quantity) {
            return res.status(400).json({ message: `Invalid quantity for order item((${orderItem.productVariantId})). Quantiy is larger than in inventory` })
        }
    }

    console.log({orderItems})

    return next()
})

// check whether order id is exist or not
const checkIdExistence = asyncHandler(async(req, res, next) => {

    const { orderId } = req.params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(404).json({ message: 'Order not found' })
    }

    const order = await Order.findOne({ _id: orderId }).populate('user', '-password').lean().exec()

    if (!order) {
        return res.status(404).json({ message: 'Order not found' })
    }
    
    // asign order to request body
    req.body.order = order

    return next()
})

module.exports = {
    checkRequiredFields,
    checkValidOrderItems,
    checkIdExistence
}