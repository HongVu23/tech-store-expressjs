const asyncHandler = require('express-async-handler')
const ChargerVariantMiddleware = require('../classes/ChargerVariantMiddleware')

// create new charger variant middleware object
const chargerVariantMiddleware = new ChargerVariantMiddleware()

// config upload for create new product variant
chargerVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
chargerVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(chargerVariantMiddleware.checkIdExistence.bind(chargerVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(chargerVariantMiddleware.checkVariantIdExistence.bind(chargerVariantMiddleware)),

    createNewChargerVariant: {
        checkForCNCV: chargerVariantMiddleware.checkForCNPV.bind(chargerVariantMiddleware),
        checkRequiredFieldsCNCV: chargerVariantMiddleware.checkRequiredFieldsCNPV.bind(chargerVariantMiddleware),
        checkDuplicateCNCV: chargerVariantMiddleware.checkDuplicateCNPV.bind(chargerVariantMiddleware),
        checkDuplicateColor: chargerVariantMiddleware.checkDuplicateColor.bind(chargerVariantMiddleware)
    },

    updateChargerVariant: {
        checkForUCV: chargerVariantMiddleware.checkForUPV.bind(chargerVariantMiddleware),
        checkRequiredFieldsUCV: chargerVariantMiddleware.checkRequiredFieldsUPV.bind(chargerVariantMiddleware)
    },

    deleteChargerVariant: {
        checkState: chargerVariantMiddleware.checkState.bind(chargerVariantMiddleware)
    }
}