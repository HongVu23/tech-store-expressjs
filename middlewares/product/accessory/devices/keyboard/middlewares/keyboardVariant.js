const asyncHandler = require('express-async-handler')
const KeyboardVariantMiddleware = require('../classes/KeyboardVariantMiddleware')

// create new keyboard variant middleware object
const keyboardVariantMiddleware = new KeyboardVariantMiddleware()

// config upload for create new product variant
keyboardVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
keyboardVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(keyboardVariantMiddleware.checkIdExistence.bind(keyboardVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(keyboardVariantMiddleware.checkVariantIdExistence.bind(keyboardVariantMiddleware)),

    createNewKeyboardVariant: {
        checkForCNKV: keyboardVariantMiddleware.checkForCNPV.bind(keyboardVariantMiddleware),
        checkRequiredFieldsCNKV: keyboardVariantMiddleware.checkRequiredFieldsCNPV.bind(keyboardVariantMiddleware),
        checkDuplicateCNKV: keyboardVariantMiddleware.checkDuplicateCNPV.bind(keyboardVariantMiddleware),
        checkDuplicateColor: keyboardVariantMiddleware.checkDuplicateColor.bind(keyboardVariantMiddleware)
    },

    updateKeyboardVariant: {
        checkForUKV: keyboardVariantMiddleware.checkForUPV.bind(keyboardVariantMiddleware),
        checkRequiredFieldsUKV: keyboardVariantMiddleware.checkRequiredFieldsUPV.bind(keyboardVariantMiddleware)
    },

    deleteKeyboardVariant: {
        checkState: keyboardVariantMiddleware.checkState.bind(keyboardVariantMiddleware)
    }
}