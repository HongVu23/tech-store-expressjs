const asyncHandler = require('express-async-handler')
const CableVariantController = require('../classes/CableVariantController')

// create new cable variant controller object
const cableVariantController = new CableVariantController()

module.exports = {
    getAllCableVariants: asyncHandler(cableVariantController.getAllProductVariants.bind(cableVariantController)),
    createNewCableVariant: asyncHandler(cableVariantController.createNewProductVariant.bind(cableVariantController)),
    updateCableVariant: asyncHandler(cableVariantController.updateProductVariant.bind(cableVariantController)),
    deleteCableVariant: asyncHandler(cableVariantController.deleteProductVariant.bind(cableVariantController)),
    getCableVariant: cableVariantController.getProductVariant.bind(cableVariantController)
}