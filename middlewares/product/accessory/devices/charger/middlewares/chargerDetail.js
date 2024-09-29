const asyncHandler = require('express-async-handler')
const ChargerDetailMiddleware = require('../classes/ChargerDetailMiddleware')

// create new charger detail middleware object
const chargerDetailMiddleware = new ChargerDetailMiddleware()

// config upload for create new color images
chargerDetailMiddleware.setUploadForCNCI()

// config upload for update color images
chargerDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
chargerDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
chargerDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(chargerDetailMiddleware.checkIdExistence.bind(chargerDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(chargerDetailMiddleware.checkDetailIdExistence.bind(chargerDetailMiddleware)),

    createNewChargerDetail: {
        checkRequiredFieldsCNCD: chargerDetailMiddleware.checkRequiredFieldsCNPD.bind(chargerDetailMiddleware),
        checkDuplicateChargerDetail: asyncHandler(chargerDetailMiddleware.checkDuplicateProductDetail.bind(chargerDetailMiddleware))
    },

    updateChargerDetail: {
        checkRequiredFieldsUCD: chargerDetailMiddleware.checkRequiredFieldsUPD.bind(chargerDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: chargerDetailMiddleware.checkRequiredColor.bind(chargerDetailMiddleware),
        checkColorExistence: chargerDetailMiddleware.checkColorExistence.bind(chargerDetailMiddleware),
        checkImagesExistence: chargerDetailMiddleware.checkImagesExistence.bind(chargerDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: chargerDetailMiddleware.checkForCNCI.bind(chargerDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: chargerDetailMiddleware.checkForUCI.bind(chargerDetailMiddleware),
            checkValidImages: chargerDetailMiddleware.checkValidImages.bind(chargerDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: chargerDetailMiddleware.checkHlImagesExistence.bind(chargerDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: chargerDetailMiddleware.checkForCNHI.bind(chargerDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: chargerDetailMiddleware.checkForUHI.bind(chargerDetailMiddleware),
            checkValidHlImages: chargerDetailMiddleware.checkValidHlImages.bind(chargerDetailMiddleware)
        }
    }
}