const asyncHandler = require('express-async-handler')
const KeyboardMiddleware = require('../classes/KeyboardMiddleware')

// create new keyboard middleware object
const keyboardMiddleware = new KeyboardMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(keyboardMiddleware.checkIdExistence.bind(keyboardMiddleware)),

    createNewKeyboard: {
        checkRequiredFieldsCNK: keyboardMiddleware.checkRequiredFieldsCNP.bind(keyboardMiddleware),
        checkDuplicateKeyboard: asyncHandler(keyboardMiddleware.checkDuplicateProduct.bind(keyboardMiddleware))
    },

    updateKeyboard: {
        checkRequiredFieldsUK: keyboardMiddleware.checkRequiredFieldsUP.bind(keyboardMiddleware)
    },

    deleteKeyboard: {
        checkVariants: asyncHandler(keyboardMiddleware.checkVariants.bind(keyboardMiddleware))
    }
}