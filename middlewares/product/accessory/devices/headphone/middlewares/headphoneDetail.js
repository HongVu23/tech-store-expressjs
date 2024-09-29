const asyncHandler = require('express-async-handler')
const HeadphoneDetailMiddleware = require('../classes/HeadphoneDetailMiddleware')

// create new headphone detail middleware object
const headphoneDetailMiddleware = new HeadphoneDetailMiddleware()

// config upload for create new color images
headphoneDetailMiddleware.setUploadForCNCI()

// config upload for update color images
headphoneDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
headphoneDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
headphoneDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(headphoneDetailMiddleware.checkIdExistence.bind(headphoneDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(headphoneDetailMiddleware.checkDetailIdExistence.bind(headphoneDetailMiddleware)),

    createNewHeadphoneDetail: {
        checkRequiredFieldsCNHD: headphoneDetailMiddleware.checkRequiredFieldsCNPD.bind(headphoneDetailMiddleware),
        checkDuplicateHeadphoneDetail: asyncHandler(headphoneDetailMiddleware.checkDuplicateProductDetail.bind(headphoneDetailMiddleware))
    },

    updateHeadphoneDetail: {
        checkRequiredFieldsUHD: headphoneDetailMiddleware.checkRequiredFieldsUPD.bind(headphoneDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: headphoneDetailMiddleware.checkRequiredColor.bind(headphoneDetailMiddleware),
        checkColorExistence: headphoneDetailMiddleware.checkColorExistence.bind(headphoneDetailMiddleware),
        checkImagesExistence: headphoneDetailMiddleware.checkImagesExistence.bind(headphoneDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: headphoneDetailMiddleware.checkForCNCI.bind(headphoneDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: headphoneDetailMiddleware.checkForUCI.bind(headphoneDetailMiddleware),
            checkValidImages: headphoneDetailMiddleware.checkValidImages.bind(headphoneDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: headphoneDetailMiddleware.checkHlImagesExistence.bind(headphoneDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: headphoneDetailMiddleware.checkForCNHI.bind(headphoneDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: headphoneDetailMiddleware.checkForUHI.bind(headphoneDetailMiddleware),
            checkValidHlImages: headphoneDetailMiddleware.checkValidHlImages.bind(headphoneDetailMiddleware)
        }
    }
}