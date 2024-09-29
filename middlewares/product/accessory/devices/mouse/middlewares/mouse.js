const asyncHandler = require('express-async-handler')
const MouseMiddleware = require('../classes/MouseMiddleware')

// create new mouse middleware object
const mouseMiddleware = new MouseMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(mouseMiddleware.checkIdExistence.bind(mouseMiddleware)),

    createNewMouse: {
        checkRequiredFieldsCNM: mouseMiddleware.checkRequiredFieldsCNP.bind(mouseMiddleware),
        checkDuplicateMouse: asyncHandler(mouseMiddleware.checkDuplicateProduct.bind(mouseMiddleware))
    },

    updateMouse: {
        checkRequiredFieldsUM: mouseMiddleware.checkRequiredFieldsUP.bind(mouseMiddleware)
    },

    deleteMouse: {
        checkVariants: asyncHandler(mouseMiddleware.checkVariants.bind(mouseMiddleware))
    }
}