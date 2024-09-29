const asyncHandler = require('express-async-handler')
const MouseVariantMiddleware = require('../classes/MouseVariantMiddleware')

// create new mouse variant middleware object
const mouseVariantMiddleware = new MouseVariantMiddleware()

// config upload for create new product variant
mouseVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
mouseVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(mouseVariantMiddleware.checkIdExistence.bind(mouseVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(mouseVariantMiddleware.checkVariantIdExistence.bind(mouseVariantMiddleware)),

    createNewMouseVariant: {
        checkForCNMV: mouseVariantMiddleware.checkForCNPV.bind(mouseVariantMiddleware),
        checkRequiredFieldsCNMV: mouseVariantMiddleware.checkRequiredFieldsCNPV.bind(mouseVariantMiddleware),
        checkDuplicateCNMV: mouseVariantMiddleware.checkDuplicateCNPV.bind(mouseVariantMiddleware),
        checkDuplicateColor: mouseVariantMiddleware.checkDuplicateColor.bind(mouseVariantMiddleware)
    },

    updateMouseVariant: {
        checkForUMV: mouseVariantMiddleware.checkForUPV.bind(mouseVariantMiddleware),
        checkRequiredFieldsUMV: mouseVariantMiddleware.checkRequiredFieldsUPV.bind(mouseVariantMiddleware)
    },

    deleteMouseVariant: {
        checkState: mouseVariantMiddleware.checkState.bind(mouseVariantMiddleware)
    }
}