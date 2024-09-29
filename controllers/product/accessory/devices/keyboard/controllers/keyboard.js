const asyncHandler = require('express-async-handler')
const KeyboardController = require('../classes/KeyboardController')

// create new keyboard controller object
const keyboardController = new KeyboardController()

module.exports = {
    getAllKeyboards: asyncHandler(keyboardController.getAllProducts.bind(keyboardController)),
    createNewKeyboard: asyncHandler(keyboardController.createNewProduct.bind(keyboardController)),
    updateKeyboard: asyncHandler(keyboardController.updateProduct.bind(keyboardController)),
    deleteKeyboard: asyncHandler(keyboardController.deleteProduct.bind(keyboardController)),
    getKeyboard: keyboardController.getProduct.bind(keyboardController),
    getFullKeyboardsInfos: asyncHandler(keyboardController.getFullProductsInfos.bind(keyboardController)),
    getFullKeyboardInfos: asyncHandler(keyboardController.getFullProductInfos.bind(keyboardController)),
    keyboardFilter: asyncHandler(keyboardController.productFilter.bind(keyboardController))
}