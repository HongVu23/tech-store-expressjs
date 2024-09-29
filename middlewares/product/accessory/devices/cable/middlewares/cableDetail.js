const asyncHandler = require('express-async-handler')
const CableDetailMiddleware = require('../classes/CableDetailMiddleware')

// create new cable detail middleware object
const cableDetailMiddleware = new CableDetailMiddleware()

// config upload for create new color images
cableDetailMiddleware.setUploadForCNCI()

// config upload for update color images
cableDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
cableDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
cableDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(cableDetailMiddleware.checkIdExistence.bind(cableDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(cableDetailMiddleware.checkDetailIdExistence.bind(cableDetailMiddleware)),

    createNewCableDetail: {
        checkRequiredFieldsCNCD: cableDetailMiddleware.checkRequiredFieldsCNPD.bind(cableDetailMiddleware),
        checkDuplicateCableDetail: asyncHandler(cableDetailMiddleware.checkDuplicateProductDetail.bind(cableDetailMiddleware))
    },

    updateCableDetail: {
        checkRequiredFieldsUCD: cableDetailMiddleware.checkRequiredFieldsUPD.bind(cableDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: cableDetailMiddleware.checkRequiredColor.bind(cableDetailMiddleware),
        checkColorExistence: cableDetailMiddleware.checkColorExistence.bind(cableDetailMiddleware),
        checkImagesExistence: cableDetailMiddleware.checkImagesExistence.bind(cableDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: cableDetailMiddleware.checkForCNCI.bind(cableDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: cableDetailMiddleware.checkForUCI.bind(cableDetailMiddleware),
            checkValidImages: cableDetailMiddleware.checkValidImages.bind(cableDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: cableDetailMiddleware.checkHlImagesExistence.bind(cableDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: cableDetailMiddleware.checkForCNHI.bind(cableDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: cableDetailMiddleware.checkForUHI.bind(cableDetailMiddleware),
            checkValidHlImages: cableDetailMiddleware.checkValidHlImages.bind(cableDetailMiddleware)
        }
    }
}