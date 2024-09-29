const asyncHandler = require('express-async-handler')
const SmartPhoneVariantController = require('../classes/SmartPhoneVariantController')

// create new smartPhone variant controller object
const smartPhoneVariantController = new SmartPhoneVariantController()

module.exports = {
    getAllSmartPhoneVariants: asyncHandler(smartPhoneVariantController.getAllProductVariants.bind(smartPhoneVariantController)),
    createNewSmartPhoneVariant: asyncHandler(smartPhoneVariantController.createNewProductVariant.bind(smartPhoneVariantController)),
    updateSmartPhoneVariant: asyncHandler(smartPhoneVariantController.updateProductVariant.bind(smartPhoneVariantController)),
    deleteSmartPhoneVariant: asyncHandler(smartPhoneVariantController.deleteProductVariant.bind(smartPhoneVariantController)),
    getSmartPhoneVariant: smartPhoneVariantController.getProductVariant.bind(smartPhoneVariantController)
}