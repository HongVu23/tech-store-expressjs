const asyncHandler = require('express-async-handler')
const SmartWatchVariantController = require('../classes/SmartWatchVariantController')

// create new smartWatch variant controller object
const smartWatchVariantController = new SmartWatchVariantController()

module.exports = {
    getAllSmartWatchVariants: asyncHandler(smartWatchVariantController.getAllProductVariants.bind(smartWatchVariantController)),
    createNewSmartWatchVariant: asyncHandler(smartWatchVariantController.createNewProductVariant.bind(smartWatchVariantController)),
    updateSmartWatchVariant: asyncHandler(smartWatchVariantController.updateProductVariant.bind(smartWatchVariantController)),
    deleteSmartWatchVariant: asyncHandler(smartWatchVariantController.deleteProductVariant.bind(smartWatchVariantController)),
    getSmartWatchVariant: smartWatchVariantController.getProductVariant.bind(smartWatchVariantController)
}