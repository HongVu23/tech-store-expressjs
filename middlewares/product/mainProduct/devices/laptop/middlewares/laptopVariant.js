const asyncHandler = require('express-async-handler')
const LaptopVariantMiddleware = require('../classes/LaptopVariantMiddleware')

// create new laptop variant middleware object
const laptopVariantMiddleware = new LaptopVariantMiddleware()

// config upload for create new product variant
laptopVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
laptopVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(laptopVariantMiddleware.checkIdExistence.bind(laptopVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(laptopVariantMiddleware.checkVariantIdExistence.bind(laptopVariantMiddleware)),

    createNewLaptopVariant: {
        checkForCNLV: laptopVariantMiddleware.checkForCNPV.bind(laptopVariantMiddleware),
        checkRequiredFieldsCNLV: laptopVariantMiddleware.checkRequiredFieldsCNPV.bind(laptopVariantMiddleware),
        checkDuplicateCNLV: laptopVariantMiddleware.checkDuplicateCNPV.bind(laptopVariantMiddleware),
        checkDuplicateColor: laptopVariantMiddleware.checkDuplicateColor.bind(laptopVariantMiddleware)
    },

    updateLaptopVariant: {
        checkForULV: laptopVariantMiddleware.checkForUPV.bind(laptopVariantMiddleware),
        checkRequiredFieldsULV: laptopVariantMiddleware.checkRequiredFieldsUPV.bind(laptopVariantMiddleware)
    },

    deleteLaptopVariant: {
        checkState: laptopVariantMiddleware.checkState.bind(laptopVariantMiddleware)
    }
}