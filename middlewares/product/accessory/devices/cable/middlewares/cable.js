const asyncHandler = require('express-async-handler')
const CableMiddleware = require('../classes/CableMiddleware')

// create new cable middleware object
const cableMiddleware = new CableMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(cableMiddleware.checkIdExistence.bind(cableMiddleware)),

    createNewCable: {
        checkRequiredFieldsCNC: cableMiddleware.checkRequiredFieldsCNP.bind(cableMiddleware),
        checkDuplicateCable: asyncHandler(cableMiddleware.checkDuplicateProduct.bind(cableMiddleware))
    },

    updateCable: {
        checkRequiredFieldsUC: cableMiddleware.checkRequiredFieldsUP.bind(cableMiddleware)
    },

    deleteCable: {
        checkVariants: asyncHandler(cableMiddleware.checkVariants.bind(cableMiddleware))
    }
}