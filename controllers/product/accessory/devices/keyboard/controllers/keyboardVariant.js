const asyncHandler = require('express-async-handler')
const KeyboardVariantController = require('../classes/KeyboardVariantController')

// create new keyboard variant controller object
const keyboardVariantController = new KeyboardVariantController()

module.exports = {
    getAllKeyboardVariants: asyncHandler(keyboardVariantController.getAllProductVariants.bind(keyboardVariantController)),
    createNewKeyboardVariant: asyncHandler(keyboardVariantController.createNewProductVariant.bind(keyboardVariantController)),
    updateKeyboardVariant: asyncHandler(keyboardVariantController.updateProductVariant.bind(keyboardVariantController)),
    deleteKeyboardVariant: asyncHandler(keyboardVariantController.deleteProductVariant.bind(keyboardVariantController)),
    getKeyboardVariant: keyboardVariantController.getProductVariant.bind(keyboardVariantController)
}