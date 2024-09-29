const asyncHandler = require('express-async-handler')
const Cart = require('../../models/user/Cart')
const ProductInventory = require('../../models/stock/ProductInventory')
const productTypes = require('../../configs/productTypes')
const { lowercaseFirstLetter } = require('../../utils/standardizeStr')

// get products in cart
const getAllProducts = asyncHandler(async (req, res) => {

    const { userId } = req.params

    const products = await Cart.find({ user: userId }).select('-user').populate('product').lean().exec()

    if (!products.length) {
        return res.status(404).json({ message: 'Cart is empty' })
    }

    const productsToRemove = []

    // join name and brand
    for (const product of products) {

        if (!product.product) {
            productsToRemove.push(product._id)
            continue
        }

        let name, model
        for (const productType of productTypes) {

            if (product.productType === productType.name + 'Variant') {
                name = lowercaseFirstLetter(productType.name)
                model = productType.model
                break
            }
        }

        // find approriate product
        const approriateProduct = await model.findOne({ _id: product.product[name] }).lean().exec()

        // asign name and brand
        product.product.name = approriateProduct.name
        product.product.brand = approriateProduct.brand
    }

    // filter for product that is undefinded
    const servedProducts = products.filter(product => !productsToRemove.includes(product._id))

    if (!servedProducts.length) {
        return res.status(404).json({ message: 'Cart is empty' })
    }

    return res.json(products)
})

// create product in cart --- or add quantity if product is exist
const createProduct = asyncHandler(async (req, res) => {

    const { productVariantId, quantity, productInventory } = req.body
    const { userId } = req.params

    // check whether it's already exist in user cart or not
    const productCart = await Cart.findOne({ product: productVariantId }).exec()

    if (!productCart) {

        await Cart.create({
            user: userId,
            product: productVariantId,
            productType: productInventory.productType,
            quantity
        })
    } else {

        const updatedQuantity = productCart.quantity + quantity

        if (updatedQuantity > productInventory.quantity) {
            return res.status(400).json({ message: 'Imvalid quantity of product. Quantity is larger than inventory' })
        }

        productCart.quantity = updatedQuantity

        await productCart.save()
    }

    return res.status(201).json({ message: 'Product is added to cart' })
})

// update product in cart
const updateProduct = asyncHandler(async (req, res) => {

    const { quantity, productCart } = req.body

    if (!quantity) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // check whether product is exist in inventory or not
    const productInventory = await ProductInventory.findOne({ product: productCart.product }).lean().exec()

    if (!productInventory) {
        return res.status(404).json({ message: 'Product not found in inventory' })
    }

    if (productInventory.quantity < quantity) {
        return res.status(400).json({ message: 'Imvalid quantity of product. Quantity is larger than inventory' })
    }

    productCart.quantity = quantity

    await productCart.save()

    return res.json({ message: 'Product is updated' })
})

// delete product in cart
const deleteProduct = asyncHandler(async (req, res) => {

    const { productCart } = req.body

    await productCart.deleteOne()

    return res.json({ message: 'Product is deleted' })
})

// delete all products in cart
const deleteAllProducts = asyncHandler(async (req, res) => {

    const { userId } = req.params

    // check whether cart is empty or not
    const products = await Cart.find({ user: userId }).lean().exec()

    if (!products.length) {
        return res.status(404).json({ message: 'Cart is empty' })
    }

    await Cart.deleteMany({ user: userId })

    return res.json({ message: 'Products is delete' })
})

// get cart statistics
const getCartStatistics = asyncHandler(async (req, res) => {

    const user = req.user

    const products = await Cart.find({ user: user.id }).populate('product').lean().exec()

    // total quantity
    let totalQuanity = 0
    let totalPrice = 0

    products.forEach(product => {
        totalQuanity += product.quantity
        totalPrice += product.quantity * product.product.price
    })

    const statistics = { totalQuanity, totalPrice }

    return res.json(statistics)
})

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    getCartStatistics
}