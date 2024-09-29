const asyncHandler = require('express-async-handler')
const SmartPhoneDetailMiddleware = require('../classes/SmartPhoneDetailMiddleware')

// create new smartPhone detail middleware object
const smartPhoneDetailMiddleware = new SmartPhoneDetailMiddleware()

// config upload for create new color images
smartPhoneDetailMiddleware.setUploadForCNCI()

// config upload for update color images
smartPhoneDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
smartPhoneDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
smartPhoneDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(smartPhoneDetailMiddleware.checkIdExistence.bind(smartPhoneDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(smartPhoneDetailMiddleware.checkDetailIdExistence.bind(smartPhoneDetailMiddleware)),

    createNewSmartPhoneDetail: {
        checkRequiredFieldsCNSMD: smartPhoneDetailMiddleware.checkRequiredFieldsCNPD.bind(smartPhoneDetailMiddleware),
        checkDuplicateSmartPhoneDetail: asyncHandler(smartPhoneDetailMiddleware.checkDuplicateProductDetail.bind(smartPhoneDetailMiddleware))
    },

    updateSmartPhoneDetail: {
        checkRequiredFieldsUSMD: smartPhoneDetailMiddleware.checkRequiredFieldsUPD.bind(smartPhoneDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: smartPhoneDetailMiddleware.checkRequiredColor.bind(smartPhoneDetailMiddleware),
        checkColorExistence: smartPhoneDetailMiddleware.checkColorExistence.bind(smartPhoneDetailMiddleware),
        checkImagesExistence: smartPhoneDetailMiddleware.checkImagesExistence.bind(smartPhoneDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: smartPhoneDetailMiddleware.checkForCNCI.bind(smartPhoneDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: smartPhoneDetailMiddleware.checkForUCI.bind(smartPhoneDetailMiddleware),
            checkValidImages: smartPhoneDetailMiddleware.checkValidImages.bind(smartPhoneDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: smartPhoneDetailMiddleware.checkHlImagesExistence.bind(smartPhoneDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: smartPhoneDetailMiddleware.checkForCNHI.bind(smartPhoneDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: smartPhoneDetailMiddleware.checkForUHI.bind(smartPhoneDetailMiddleware),
            checkValidHlImages: smartPhoneDetailMiddleware.checkValidHlImages.bind(smartPhoneDetailMiddleware)
        }
    }
}