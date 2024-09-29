const asyncHandler = require('express-async-handler')
const SmartPhoneVariantMiddleware = require('../classes/SmartPhoneVariantMiddleware')

// create new smartPhone variant middleware object
const smartPhoneVariantMiddleware = new SmartPhoneVariantMiddleware()

// config upload for create new product variant
smartPhoneVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
smartPhoneVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(smartPhoneVariantMiddleware.checkIdExistence.bind(smartPhoneVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(smartPhoneVariantMiddleware.checkVariantIdExistence.bind(smartPhoneVariantMiddleware)),

    createNewSmartPhoneVariant: {
        checkForCNSMV: smartPhoneVariantMiddleware.checkForCNPV.bind(smartPhoneVariantMiddleware),
        checkRequiredFieldsCNSMV: smartPhoneVariantMiddleware.checkRequiredFieldsCNPV.bind(smartPhoneVariantMiddleware),
        checkDuplicateCNSMV: smartPhoneVariantMiddleware.checkDuplicateCNPV.bind(smartPhoneVariantMiddleware),
        checkDuplicateColor: smartPhoneVariantMiddleware.checkDuplicateColor.bind(smartPhoneVariantMiddleware)
    },

    updateSmartPhoneVariant: {
        checkForUSMV: smartPhoneVariantMiddleware.checkForUPV.bind(smartPhoneVariantMiddleware),
        checkRequiredFieldsUSMV: smartPhoneVariantMiddleware.checkRequiredFieldsUPV.bind(smartPhoneVariantMiddleware)
    },

    deleteSmartPhoneVariant: {
        checkState: smartPhoneVariantMiddleware.checkState.bind(smartPhoneVariantMiddleware)
    }
}