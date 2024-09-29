const asyncHandler = require('express-async-handler')
const SmartWatchMiddleware = require('../classes/SmartWatchMiddleware')

// create new smartWatch middleware object
const smartWatchMiddleware = new SmartWatchMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(smartWatchMiddleware.checkIdExistence.bind(smartWatchMiddleware)),

    createNewSmartWatch: {
        checkRequiredFieldsCNSW: smartWatchMiddleware.checkRequiredFieldsCNP.bind(smartWatchMiddleware),
        checkDuplicateSmartWatch: asyncHandler(smartWatchMiddleware.checkDuplicateProduct.bind(smartWatchMiddleware))
    },

    updateSmartWatch: {
        checkRequiredFieldsUSW: smartWatchMiddleware.checkRequiredFieldsUP.bind(smartWatchMiddleware)
    },

    deleteSmartWatch: {
        checkVariants: asyncHandler(smartWatchMiddleware.checkVariants.bind(smartWatchMiddleware))
    }
}