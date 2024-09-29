const asyncHandler = require('express-async-handler')
const CableVariantMiddleware = require('../classes/CableVariantMiddleware')

// create new cable variant middleware object
const cableVariantMiddleware = new CableVariantMiddleware()

// config upload for create new product variant
cableVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
cableVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(cableVariantMiddleware.checkIdExistence.bind(cableVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(cableVariantMiddleware.checkVariantIdExistence.bind(cableVariantMiddleware)),

    createNewCableVariant: {
        checkForCNCV: cableVariantMiddleware.checkForCNPV.bind(cableVariantMiddleware),
        checkRequiredFieldsCNCV: cableVariantMiddleware.checkRequiredFieldsCNPV.bind(cableVariantMiddleware),
        checkDuplicateCNCV: cableVariantMiddleware.checkDuplicateCNPV.bind(cableVariantMiddleware),
        checkDuplicateColor: cableVariantMiddleware.checkDuplicateColor.bind(cableVariantMiddleware)
    },

    updateCableVariant: {
        checkForUCV: cableVariantMiddleware.checkForUPV.bind(cableVariantMiddleware),
        checkRequiredFieldsUCV: cableVariantMiddleware.checkRequiredFieldsUPV.bind(cableVariantMiddleware)
    },

    deleteCableVariant: {
        checkState: cableVariantMiddleware.checkState.bind(cableVariantMiddleware)
    }
}