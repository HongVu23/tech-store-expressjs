const asyncHandler = require('express-async-handler')
const LaptopMiddleware = require('../classes/LaptopMiddleware')

// create new laptop middleware object
const laptopMiddleware = new LaptopMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(laptopMiddleware.checkIdExistence.bind(laptopMiddleware)),

    createNewLaptop: {
        checkRequiredFieldsCNL: laptopMiddleware.checkRequiredFieldsCNP.bind(laptopMiddleware),
        checkDuplicateLaptop: asyncHandler(laptopMiddleware.checkDuplicateProduct.bind(laptopMiddleware))
    },

    updateLaptop: {
        checkRequiredFieldsUL: laptopMiddleware.checkRequiredFieldsUP.bind(laptopMiddleware)
    },

    deleteLaptop: {
        checkVariants: asyncHandler(laptopMiddleware.checkVariants.bind(laptopMiddleware))
    }
}