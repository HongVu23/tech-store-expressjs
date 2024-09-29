const asyncHandler = require('express-async-handler')
const HeadphoneVariantController = require('../classes/HeadphoneVariantController')

// create new headphone variant controller object
const headphoneVariantController = new HeadphoneVariantController()

module.exports = {
    getAllHeadphoneVariants: asyncHandler(headphoneVariantController.getAllProductVariants.bind(headphoneVariantController)),
    createNewHeadphoneVariant: asyncHandler(headphoneVariantController.createNewProductVariant.bind(headphoneVariantController)),
    updateHeadphoneVariant: asyncHandler(headphoneVariantController.updateProductVariant.bind(headphoneVariantController)),
    deleteHeadphoneVariant: asyncHandler(headphoneVariantController.deleteProductVariant.bind(headphoneVariantController)),
    getHeadphoneVariant: headphoneVariantController.getProductVariant.bind(headphoneVariantController)
}