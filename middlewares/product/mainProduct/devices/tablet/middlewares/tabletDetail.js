const asyncHandler = require('express-async-handler')
const TabletDetailMiddleware = require('../classes/TabletDetailMiddleware')

// create new tablet detail middleware object
const tabletDetailMiddleware = new TabletDetailMiddleware()

// config upload for create new color images
tabletDetailMiddleware.setUploadForCNCI()

// config upload for update color images
tabletDetailMiddleware.setUploadForUCI()

// config upload for create new highlighted images
tabletDetailMiddleware.setUploadForCNHI()

// config upload for update highlighted images
tabletDetailMiddleware.setUploadForUHI()

module.exports = {
    checkIdExistence: asyncHandler(tabletDetailMiddleware.checkIdExistence.bind(tabletDetailMiddleware)),
    checkDetailIdExistence: asyncHandler(tabletDetailMiddleware.checkDetailIdExistence.bind(tabletDetailMiddleware)),

    createNewTabletDetail: {
        checkRequiredFieldsCNTD: tabletDetailMiddleware.checkRequiredFieldsCNPD.bind(tabletDetailMiddleware),
        checkDuplicateTabletDetail: asyncHandler(tabletDetailMiddleware.checkDuplicateProductDetail.bind(tabletDetailMiddleware))
    },

    updateTabletDetail: {
        checkRequiredFieldsUTD: tabletDetailMiddleware.checkRequiredFieldsUPD.bind(tabletDetailMiddleware)
    },

    colorImages: {
        checkRequiredColor: tabletDetailMiddleware.checkRequiredColor.bind(tabletDetailMiddleware),
        checkColorExistence: tabletDetailMiddleware.checkColorExistence.bind(tabletDetailMiddleware),
        checkImagesExistence: tabletDetailMiddleware.checkImagesExistence.bind(tabletDetailMiddleware),

        createNewColorImages: {
            checkForCNCI: tabletDetailMiddleware.checkForCNCI.bind(tabletDetailMiddleware)
        },

        updateColorImages: {
            checkForUCI: tabletDetailMiddleware.checkForUCI.bind(tabletDetailMiddleware),
            checkValidImages: tabletDetailMiddleware.checkValidImages.bind(tabletDetailMiddleware)
        }
    },

    highlightedImages: {
        checkHlImagesExistence: tabletDetailMiddleware.checkHlImagesExistence.bind(tabletDetailMiddleware),

        createNewHighlightedImages: {
            checkForCNHI: tabletDetailMiddleware.checkForCNHI.bind(tabletDetailMiddleware)
        },

        updateHighlightedImages: {
            checkForUHI: tabletDetailMiddleware.checkForUHI.bind(tabletDetailMiddleware),
            checkValidHlImages: tabletDetailMiddleware.checkValidHlImages.bind(tabletDetailMiddleware)
        }
    }
}