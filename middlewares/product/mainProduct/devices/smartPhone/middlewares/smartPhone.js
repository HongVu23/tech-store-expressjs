const asyncHandler = require('express-async-handler')
const SmartPhoneMiddleware = require('../classes/SmartPhoneMiddleware')

// create new smartPhone middleware object
const smartPhoneMiddleware = new SmartPhoneMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(smartPhoneMiddleware.checkIdExistence.bind(smartPhoneMiddleware)),

    createNewSmartPhone: {
        checkRequiredFieldsCNSM: smartPhoneMiddleware.checkRequiredFieldsCNP.bind(smartPhoneMiddleware),
        checkDuplicateSmartPhone: asyncHandler(smartPhoneMiddleware.checkDuplicateProduct.bind(smartPhoneMiddleware))
    },

    updateSmartPhone: {
        checkRequiredFieldsUSM: smartPhoneMiddleware.checkRequiredFieldsUP.bind(smartPhoneMiddleware)
    },

    deleteSmartPhone: {
        checkVariants: asyncHandler(smartPhoneMiddleware.checkVariants.bind(smartPhoneMiddleware))
    }
}