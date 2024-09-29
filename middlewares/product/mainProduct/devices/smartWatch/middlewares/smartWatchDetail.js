const asyncHandler = require('express-async-handler')
const SmartWatchDetailMiddleware = require('../classes/SmartWatchDetailMiddleware')

// create new smartWatch detail middleware object
const smartWatchDetailMiddleware = new SmartWatchDetailMiddleware()

// config upload for create new color images
smartWatchDetailMiddleware.setUploadForCNCI()

// config upload for update color images
smartWatchDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
smartWatchDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
smartWatchDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(smartWatchDetailMiddleware.checkIdExistence.bind(smartWatchDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(smartWatchDetailMiddleware.checkDetailIdExistence.bind(smartWatchDetailMiddleware)),

    createNewSmartWatchDetail: {
        checkRequiredFieldsCNSWD: smartWatchDetailMiddleware.checkRequiredFieldsCNPD.bind(smartWatchDetailMiddleware),
        checkDuplicateSmartWatchDetail: asyncHandler(smartWatchDetailMiddleware.checkDuplicateProductDetail.bind(smartWatchDetailMiddleware))
    },

    updateSmartWatchDetail: {
        checkRequiredFieldsUSWD: smartWatchDetailMiddleware.checkRequiredFieldsUPD.bind(smartWatchDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: smartWatchDetailMiddleware.checkRequiredColor.bind(smartWatchDetailMiddleware),
        checkColorExistence: smartWatchDetailMiddleware.checkColorExistence.bind(smartWatchDetailMiddleware),
        checkImagesExistence: smartWatchDetailMiddleware.checkImagesExistence.bind(smartWatchDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: smartWatchDetailMiddleware.checkForCNCI.bind(smartWatchDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: smartWatchDetailMiddleware.checkForUCI.bind(smartWatchDetailMiddleware),
            checkValidImages: smartWatchDetailMiddleware.checkValidImages.bind(smartWatchDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: smartWatchDetailMiddleware.checkHlImagesExistence.bind(smartWatchDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: smartWatchDetailMiddleware.checkForCNHI.bind(smartWatchDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: smartWatchDetailMiddleware.checkForUHI.bind(smartWatchDetailMiddleware),
            checkValidHlImages: smartWatchDetailMiddleware.checkValidHlImages.bind(smartWatchDetailMiddleware)
        }
    }
}