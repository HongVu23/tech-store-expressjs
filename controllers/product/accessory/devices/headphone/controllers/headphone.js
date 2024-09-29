const asyncHandler = require('express-async-handler')
const HeadphoneController = require('../classes/HeadphoneController')

// create new headphone controller object
const headphoneController = new HeadphoneController()

module.exports = {
    getAllHeadphones: asyncHandler(headphoneController.getAllProducts.bind(headphoneController)),
    createNewHeadphone: asyncHandler(headphoneController.createNewProduct.bind(headphoneController)),
    updateHeadphone: asyncHandler(headphoneController.updateProduct.bind(headphoneController)),
    deleteHeadphone: asyncHandler(headphoneController.deleteProduct.bind(headphoneController)),
    getHeadphone: headphoneController.getProduct.bind(headphoneController),
    getFullHeadphonesInfos: asyncHandler(headphoneController.getFullProductsInfos.bind(headphoneController)),
    getFullHeadphoneInfos: asyncHandler(headphoneController.getFullProductInfos.bind(headphoneController)),
    headphoneFilter: asyncHandler(headphoneController.productFilter.bind(headphoneController))
}