const asyncHandler = require('express-async-handler')
const FavoriteProduct = require('../../models/user/FavoriteProduct')
const productTypes = require('../../configs/productTypes')

// get all favorite products
const getAllFavoriteProducts = asyncHandler(async (req, res) => {

    const user = req.user

    const favoriteProducts = await FavoriteProduct.find({ user: user.id }).populate('product').select('-user').lean().exec()

    if (!favoriteProducts.length) {
        // return res.status(404).json({ message: 'Favorite products not found' })
        return res.json([])
    }

    return res.json(favoriteProducts)
})

// create new favorite product
const createNewFavoriteProduct = asyncHandler(async (req, res) => {

    const { productId, product } = req.body
    const { userId } = req.params

    await FavoriteProduct.create({
        user: userId,
        product: productId,
        productType: product.productType
    })

    return res.status(201).json({ message: 'New favorite product is created' })
})

// delete favorite product
const deleteFavoriteProduct = asyncHandler(async (req, res) => {

    const { favoriteProduct } = req.body

    await favoriteProduct.deleteOne()

    return res.json({ message: 'Favorite product is deleted' })
})

module.exports = {
    getAllFavoriteProducts,
    createNewFavoriteProduct,
    deleteFavoriteProduct
}