const asyncHandler = require('express-async-handler')
const ChargerMiddleware = require('../classes/ChargerMiddleware')

// create new charger middleware object
const chargerMiddleware = new ChargerMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(chargerMiddleware.checkIdExistence.bind(chargerMiddleware)),

    createNewCharger: {
        checkRequiredFieldsCNC: chargerMiddleware.checkRequiredFieldsCNP.bind(chargerMiddleware),
        checkDuplicateCharger: asyncHandler(chargerMiddleware.checkDuplicateProduct.bind(chargerMiddleware))
    },

    updateCharger: {
        checkRequiredFieldsUC: chargerMiddleware.checkRequiredFieldsUP.bind(chargerMiddleware)
    },

    deleteCharger: {
        checkVariants: asyncHandler(chargerMiddleware.checkVariants.bind(chargerMiddleware))
    }
}