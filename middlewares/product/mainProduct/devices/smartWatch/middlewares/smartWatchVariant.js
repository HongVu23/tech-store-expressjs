const asyncHandler = require('express-async-handler')
const SmartWatchVariantMiddleware = require('../classes/SmartWatchVariantMiddleware')

// create new smartWatch variant middleware object
const smartWatchVariantMiddleware = new SmartWatchVariantMiddleware()

// config upload for create new product variant
smartWatchVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
smartWatchVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(smartWatchVariantMiddleware.checkIdExistence.bind(smartWatchVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(smartWatchVariantMiddleware.checkVariantIdExistence.bind(smartWatchVariantMiddleware)),

    createNewSmartWatchVariant: {
        checkForCNSWV: smartWatchVariantMiddleware.checkForCNPV.bind(smartWatchVariantMiddleware),
        checkRequiredFieldsCNSWV: smartWatchVariantMiddleware.checkRequiredFieldsCNPV.bind(smartWatchVariantMiddleware),
        checkDuplicateCNSWV: smartWatchVariantMiddleware.checkDuplicateCNPV.bind(smartWatchVariantMiddleware),
        checkDuplicateColor: smartWatchVariantMiddleware.checkDuplicateColor.bind(smartWatchVariantMiddleware)
    },

    updateSmartWatchVariant: {
        checkForUSWV: smartWatchVariantMiddleware.checkForUPV.bind(smartWatchVariantMiddleware),
        checkRequiredFieldsUSWV: smartWatchVariantMiddleware.checkRequiredFieldsUPV.bind(smartWatchVariantMiddleware)
    },

    deleteSmartWatchVariant: {
        checkState: smartWatchVariantMiddleware.checkState.bind(smartWatchVariantMiddleware)
    }
}