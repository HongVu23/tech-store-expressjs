const asyncHandler = require('express-async-handler')
const MouseDetailMiddleware = require('../classes/MouseDetailMiddleware')

// create new mouse detail middleware object
const mouseDetailMiddleware = new MouseDetailMiddleware()

// config upload for create new color images
mouseDetailMiddleware.setUploadForCNCI()

// config upload for update color images
mouseDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
mouseDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
mouseDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(mouseDetailMiddleware.checkIdExistence.bind(mouseDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(mouseDetailMiddleware.checkDetailIdExistence.bind(mouseDetailMiddleware)),

    createNewMouseDetail: {
        checkRequiredFieldsCNMD: mouseDetailMiddleware.checkRequiredFieldsCNPD.bind(mouseDetailMiddleware),
        checkDuplicateMouseDetail: asyncHandler(mouseDetailMiddleware.checkDuplicateProductDetail.bind(mouseDetailMiddleware))
    },

    updateMouseDetail: {
        checkRequiredFieldsUMD: mouseDetailMiddleware.checkRequiredFieldsUPD.bind(mouseDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: mouseDetailMiddleware.checkRequiredColor.bind(mouseDetailMiddleware),
        checkColorExistence: mouseDetailMiddleware.checkColorExistence.bind(mouseDetailMiddleware),
        checkImagesExistence: mouseDetailMiddleware.checkImagesExistence.bind(mouseDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: mouseDetailMiddleware.checkForCNCI.bind(mouseDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: mouseDetailMiddleware.checkForUCI.bind(mouseDetailMiddleware),
            checkValidImages: mouseDetailMiddleware.checkValidImages.bind(mouseDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: mouseDetailMiddleware.checkHlImagesExistence.bind(mouseDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: mouseDetailMiddleware.checkForCNHI.bind(mouseDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: mouseDetailMiddleware.checkForUHI.bind(mouseDetailMiddleware),
            checkValidHlImages: mouseDetailMiddleware.checkValidHlImages.bind(mouseDetailMiddleware)
        }
    }
}