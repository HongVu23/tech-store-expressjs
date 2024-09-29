const asyncHandler = require('express-async-handler')
const KeyboardDetailMiddleware = require('../classes/KeyboardDetailMiddleware')

// create new keyboard detail middleware object
const keyboardDetailMiddleware = new KeyboardDetailMiddleware()

// config upload for create new color images
keyboardDetailMiddleware.setUploadForCNCI()

// config upload for update color images
keyboardDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
keyboardDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
keyboardDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(keyboardDetailMiddleware.checkIdExistence.bind(keyboardDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(keyboardDetailMiddleware.checkDetailIdExistence.bind(keyboardDetailMiddleware)),

    createNewKeyboardDetail: {
        checkRequiredFieldsCNKD: keyboardDetailMiddleware.checkRequiredFieldsCNPD.bind(keyboardDetailMiddleware),
        checkDuplicateKeyboardDetail: asyncHandler(keyboardDetailMiddleware.checkDuplicateProductDetail.bind(keyboardDetailMiddleware))
    },

    updateKeyboardDetail: {
        checkRequiredFieldsUKD: keyboardDetailMiddleware.checkRequiredFieldsUPD.bind(keyboardDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: keyboardDetailMiddleware.checkRequiredColor.bind(keyboardDetailMiddleware),
        checkColorExistence: keyboardDetailMiddleware.checkColorExistence.bind(keyboardDetailMiddleware),
        checkImagesExistence: keyboardDetailMiddleware.checkImagesExistence.bind(keyboardDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: keyboardDetailMiddleware.checkForCNCI.bind(keyboardDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: keyboardDetailMiddleware.checkForUCI.bind(keyboardDetailMiddleware),
            checkValidImages: keyboardDetailMiddleware.checkValidImages.bind(keyboardDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: keyboardDetailMiddleware.checkHlImagesExistence.bind(keyboardDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: keyboardDetailMiddleware.checkForCNHI.bind(keyboardDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: keyboardDetailMiddleware.checkForUHI.bind(keyboardDetailMiddleware),
            checkValidHlImages: keyboardDetailMiddleware.checkValidHlImages.bind(keyboardDetailMiddleware)
        }
    }
}