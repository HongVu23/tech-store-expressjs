const asyncHandler = require('express-async-handler')
const LaptopDetailMiddleware = require('../classes/LaptopDetailMiddleware')

// create new laptop detail middleware object
const laptopDetailMiddleware = new LaptopDetailMiddleware()

// config upload for create new color images
laptopDetailMiddleware.setUploadForCNCI()

// config upload for update color images
laptopDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
laptopDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
laptopDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(laptopDetailMiddleware.checkIdExistence.bind(laptopDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(laptopDetailMiddleware.checkDetailIdExistence.bind(laptopDetailMiddleware)),

    createNewLaptopDetail: {
        checkRequiredFieldsCNLD: laptopDetailMiddleware.checkRequiredFieldsCNPD.bind(laptopDetailMiddleware),
        checkDuplicateLaptopDetail: asyncHandler(laptopDetailMiddleware.checkDuplicateProductDetail.bind(laptopDetailMiddleware))
    },

    updateLaptopDetail: {
        checkRequiredFieldsULD: laptopDetailMiddleware.checkRequiredFieldsUPD.bind(laptopDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: laptopDetailMiddleware.checkRequiredColor.bind(laptopDetailMiddleware),
        checkColorExistence: laptopDetailMiddleware.checkColorExistence.bind(laptopDetailMiddleware),
        checkImagesExistence: laptopDetailMiddleware.checkImagesExistence.bind(laptopDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: laptopDetailMiddleware.checkForCNCI.bind(laptopDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: laptopDetailMiddleware.checkForUCI.bind(laptopDetailMiddleware),
            checkValidImages: laptopDetailMiddleware.checkValidImages.bind(laptopDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: laptopDetailMiddleware.checkHlImagesExistence.bind(laptopDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: laptopDetailMiddleware.checkForCNHI.bind(laptopDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: laptopDetailMiddleware.checkForUHI.bind(laptopDetailMiddleware),
            checkValidHlImages: laptopDetailMiddleware.checkValidHlImages.bind(laptopDetailMiddleware)
        }
    }
}