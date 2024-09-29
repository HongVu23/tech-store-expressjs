const asyncHandler = require('express-async-handler')
const HeadphoneMiddleware = require('../classes/HeadphoneMiddleware')

// create new headphone middleware object
const headphoneMiddleware = new HeadphoneMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(headphoneMiddleware.checkIdExistence.bind(headphoneMiddleware)),

    createNewHeadphone: {
        checkRequiredFieldsCNH: headphoneMiddleware.checkRequiredFieldsCNP.bind(headphoneMiddleware),
        checkDuplicateHeadphone: asyncHandler(headphoneMiddleware.checkDuplicateProduct.bind(headphoneMiddleware))
    },

    updateHeadphone: {
        checkRequiredFieldsUH: headphoneMiddleware.checkRequiredFieldsUP.bind(headphoneMiddleware)
    },

    deleteHeadphone: {
        checkVariants: asyncHandler(headphoneMiddleware.checkVariants.bind(headphoneMiddleware))
    }
}