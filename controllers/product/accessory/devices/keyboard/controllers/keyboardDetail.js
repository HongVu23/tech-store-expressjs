const asyncHandler = require('express-async-handler')
const KeyboardDetailController = require('../classes/KeyboardDetailController')

// create new keyboard detail controller object
const keyboardDetailController = new KeyboardDetailController()

module.exports = {
    getKeyboardDetail: asyncHandler(keyboardDetailController.getProductDetail.bind(keyboardDetailController)),
    createNewKeyboardDetail: asyncHandler(keyboardDetailController.createNewProductDetail.bind(keyboardDetailController)),
    updateKeyboardDetail: asyncHandler(keyboardDetailController.updateProductDetail.bind(keyboardDetailController)),
    deleteKeyboardDetail: asyncHandler(keyboardDetailController.deleteProductDetail.bind(keyboardDetailController)),
    
    colorImages: {
        getColorImages: keyboardDetailController.getColorImages.bind(keyboardDetailController),
        createNewColorImages: asyncHandler(keyboardDetailController.createNewColorImages.bind(keyboardDetailController)),
        updateColorImages: asyncHandler(keyboardDetailController.updateColorImages.bind(keyboardDetailController)),
        deleteColorImages: asyncHandler(keyboardDetailController.deleteColorImages.bind(keyboardDetailController))
    },

    highlightedImages: {
        getHighlightedImages: keyboardDetailController.getHighlightedImages.bind(keyboardDetailController),
        createNewHighlightedImages: asyncHandler(keyboardDetailController.createNewHighlightedImages.bind(keyboardDetailController)),
        updateHighlightedImages: asyncHandler(keyboardDetailController.updateHighlightedImages.bind(keyboardDetailController)),
        deleteHighlightedImages: asyncHandler(keyboardDetailController.deleteHighlightedImages.bind(keyboardDetailController))
    }
}