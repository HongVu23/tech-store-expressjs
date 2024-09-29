const asyncHandler = require('express-async-handler')
const MouseVariantController = require('../classes/MouseVariantController')

// create new mouse variant controller object
const mouseVariantController = new MouseVariantController()

module.exports = {
    getAllMouseVariants: asyncHandler(mouseVariantController.getAllProductVariants.bind(mouseVariantController)),
    createNewMouseVariant: asyncHandler(mouseVariantController.createNewProductVariant.bind(mouseVariantController)),
    updateMouseVariant: asyncHandler(mouseVariantController.updateProductVariant.bind(mouseVariantController)),
    deleteMouseVariant: asyncHandler(mouseVariantController.deleteProductVariant.bind(mouseVariantController)),
    getMouseVariant: mouseVariantController.getProductVariant.bind(mouseVariantController)
}