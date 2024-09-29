const asyncHandler = require('express-async-handler')
const HeadphoneVariantMiddleware = require('../classes/HeadphoneVariantMiddleware')

// create new headphone variant middleware object
const headphoneVariantMiddleware = new HeadphoneVariantMiddleware()

// config upload for create new product variant
headphoneVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
headphoneVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(headphoneVariantMiddleware.checkIdExistence.bind(headphoneVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(headphoneVariantMiddleware.checkVariantIdExistence.bind(headphoneVariantMiddleware)),

    createNewHeadphoneVariant: {
        checkForCNHV: headphoneVariantMiddleware.checkForCNPV.bind(headphoneVariantMiddleware),
        checkRequiredFieldsCNHV: headphoneVariantMiddleware.checkRequiredFieldsCNPV.bind(headphoneVariantMiddleware),
        checkDuplicateCNHV: headphoneVariantMiddleware.checkDuplicateCNPV.bind(headphoneVariantMiddleware),
        checkDuplicateColor: headphoneVariantMiddleware.checkDuplicateColor.bind(headphoneVariantMiddleware)
    },

    updateHeadphoneVariant: {
        checkForUHV: headphoneVariantMiddleware.checkForUPV.bind(headphoneVariantMiddleware),
        checkRequiredFieldsUHV: headphoneVariantMiddleware.checkRequiredFieldsUPV.bind(headphoneVariantMiddleware)
    },

    deleteHeadphoneVariant: {
        checkState: headphoneVariantMiddleware.checkState.bind(headphoneVariantMiddleware)
    }
}