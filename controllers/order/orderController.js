const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const User = require('../../models/user/User')
const Order = require('../../models/order/Order')
const ProductInventory = require('../../models/stock/ProductInventory')
const productTypes = require('../../configs/productTypes')
const productVariantTypes = require('../../configs/productVariantTypes')
const getOrdersInfo = require('../../helpers/order/getOrdersInfo')
const getSaledProducts = require('../../helpers/order/getSaledProducts')
const { getYearStatistics, getMonthStatistics } = require('../../helpers/order/getSatisticChart')
const { lowercaseFirstLetter } = require('../../utils/standardizeStr')
const { isValidYear, isValidMonth } = require('../../utils/dateValidator')

// get all orders
const getAllOrders = asyncHandler(async (req, res) => {

    const user = req.user

    let orders
    if (user.role === 'Admin') {
        // get userId query
        const { userId } = req.query

        if (userId) {

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(404).json({ message: 'Orders not found' })
            }

            orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate('user', '-password').lean().exec()
        } else {
            orders = await Order.find().sort({ createdAt: -1 }).populate('user', '-password').lean().exec()
        }

    } else {
        orders = await Order.find({ user: user.id }).sort({ createdAt: -1 }).populate('user', '-password').lean().exec()
    }

    orders = await getOrdersInfo(orders)

    if (!orders.length) {
        return res.status(404).json({ message: 'Orders not found' })
    }

    return res.json(orders)
})

// create new order
const createNewOrder = asyncHandler(async (req, res) => {

    let { orderItems, paymentMethod, phoneNumber, address } = req.body
    const user = req.user

    // get user info
    const userInfo = await User.findOne({ _id: user.id }).lean().exec()

    if (!phoneNumber) {

        if (userInfo.phoneNumber) {
            phoneNumber = user.phoneNumber
        } else {

            return res.status(400).json({ message: 'Phone number is required. You do not have phone number in your account yet.' })
        }
    }

    if (!address) {
        let orderAddress

        if (userInfo.address.length) {

            for (const address of userInfo.address) {
                if (address.defaultAddress) {
                    orderAddress = address.address
                    break
                }
            }
        } else {
            return res.status(400).json({ message: 'An address is required. You do not have an address in your account yet.' })
        }

        address = orderAddress
    }

    const currentDate = new Date()

    const preparedOrderItems = []
    let totalOfOrder = 0

    for (const orderItem of orderItems) {

        let price = orderItem.productVariantInfo.productVariant.price

        if (orderItem.productVariantInfo.productVariant.discount.discountPercentage) {

            if (currentDate < orderItem.productVariantInfo.productVariant.discount.discountEndDate) {

                // if there is still a discount
                const discountAmount = price * (orderItem.productVariantInfo.productVariant.discount.discountPercentage / 100)

                price = price - discountAmount
            }
        }

        // caculate total price
        const tolalPrice = orderItem.quantity * price
        totalOfOrder += tolalPrice

        preparedOrderItems.push({
            product: orderItem.productVariantId,
            productType: orderItem.productVariantInfo.productVariantType,
            quantity: orderItem.quantity,
            total: tolalPrice
        })

        // reduce quantity in inventory
        const productInventory = await ProductInventory.findOne({ product: orderItem.productVariantId }).exec()

        productInventory.quantity -= orderItem.quantity

        if (!productInventory.quantity) {
            orderItem.productVariantInfo.productVariant.status = false
        }

        await orderItem.productVariantInfo.productVariant.save()

        await productInventory.save()
    }

    // create new order
    await Order.create({
        user: user.id,
        orderItems: preparedOrderItems,
        paymentMethod,
        phoneNumber,
        address,
        total: totalOfOrder
    })

    return res.status(201).json({ message: 'Order is created' })
})

// get a order
const getOrder = asyncHandler(async (req, res) => {

    const { order } = req.body
    const user = req.user

    // check wether this is user or admin
    if (user.role === 'User') {

        // find all order of this users
        const orders = await Order.find({ user: user.id }).lean().exec()

        if (!orders.length || !orders.some(o => o._id.toString() === order._id.toString())) {
            return res.status(403).json({ message: 'Forbidden' })
        }
    }

    // find and attach variant
    for (const orderItem of order.orderItems) {
        let variantModel
        // get specific model
        for (const productVariantType of productVariantTypes) {
            if (productVariantType.name === orderItem.productType) {
                variantModel = productVariantType.model
                break
            }
        }

        const productVariant = await variantModel.findOne({ _id: orderItem.product }).lean().exec()

        // re-asign to product of orderItem
        orderItem.product = productVariant

        // find appropriate model of orderItem
        let model, name
        for (const productType of productTypes) {
            if (productType.name + 'Variant' === orderItem.productType) {
                model = productType.model
                name = lowercaseFirstLetter(productType.name)
                break
            }
        }

        // find product informations
        const product = await model.findOne({ _id: orderItem.product[name] }).lean().exec()

        // asign name, brand to product of orderItem
        orderItem.product.name = product.name
        orderItem.product.brand = product.brand
    }

    return res.json(order)
})

// get order statistics
const getStatistics = asyncHandler(async (req, res) => {

    let orders = await Order.find().populate('user', '-password').lean().exec()

    orders = await getOrdersInfo(orders)

    if (!orders.length) {
        return res.status(404).json({ message: 'Orders not found' })
    }

    // get products statistics
    const products = getSaledProducts(orders)

    // get total products in inventory
    const sumInventQuantity = await ProductInventory.aggregate([
        {
            $group: {
                _id: null,
                totalQuantity: {
                    $sum: '$quantity'
                }
            }
        }
    ])

    const quantityInInventory = sumInventQuantity[0].totalQuantity

    // get all customers
    const user = {
        numberOfUser: 0,
        numberOfEnableUser: 0,
        numberOfDisableUser: 0
    }

    const users = await User.find({ role: 'User' }).lean().exec()
    user.numberOfUser = users.length

    // total enable and disable users
    const userCount = await User.aggregate([
        { $match: { role: 'User' } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ])

    let numberOfEnableUser = 0
    let numberOfDisableUser = 0

    for (const { _id, count } of userCount) {
        if (_id === true) {
            numberOfEnableUser = count
        } else if (_id === false) {
            numberOfDisableUser = count
        }
    }

    // asign to user object
    user.numberOfEnableUser = numberOfEnableUser
    user.numberOfDisableUser = numberOfDisableUser

    // find number of products
    let numberOfProduct = 0
    for (const productType of productTypes) {
        
        const pros = await productType.model.find().lean().exec()

        numberOfProduct += pros.length
    }

    // prepares statistics
    const statistics = {
        numberOfOrder: orders.length,
        products,
        quantityInInventory,
        user,
        numberOfProduct
    }

    return res.json(statistics)
})

// get statistic charts
const getStatisticChart = asyncHandler(async (req, res) => {

    const { month, year = new Date().getFullYear().toString() } = req.query

    let result

    if (year) {
        // check whether year is valid or not
        const isValidYearResult = isValidYear(year)
        if (!isValidYearResult) {
            return res.status(400).json({ message: 'Year is invalid' })
        }

        if (month) {
            // check whether month is invalid or not
            const isValidMonthResult = isValidMonth(month)

            if (!isValidMonthResult) {
                return res.status(400).json({ message: 'Month is invalid' })
            }

            // get data
            const recievedData = await getMonthStatistics(year, month)

            if (!recievedData.isValid) {
                return res.status(404).json({ message: recievedData.error.message })
            }

            result = recievedData.data
        } else {
            // get data
            const recievedData = await getYearStatistics(year)

            if (!recievedData.isValid) {
                return res.status(404).json({ message: recievedData.error.message })
            }

            result = recievedData.data
        }
    }

    res.json(result)
})

module.exports = {
    getAllOrders,
    createNewOrder,
    getOrder,
    getStatistics,
    getStatisticChart
}