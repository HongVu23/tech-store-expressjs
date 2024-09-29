const asyncHandler = require('express-async-handler')
const TabletVariantMiddleware = require('../classes/TabletVariantMiddleware')

// create new tablet variant middleware object
const tabletVariantMiddleware = new TabletVariantMiddleware()

// config upload for create new product variant
tabletVariantMiddleware.setUploadForCNPV()

// config upload for update product variant
tabletVariantMiddleware.setUploadForUPV()

module.exports = {
    checkIdExistence: asyncHandler(tabletVariantMiddleware.checkIdExistence.bind(tabletVariantMiddleware)),
    checkVariantIdExistence: asyncHandler(tabletVariantMiddleware.checkVariantIdExistence.bind(tabletVariantMiddleware)),

    createNewTabletVariant: {
        checkForCNTV: tabletVariantMiddleware.checkForCNPV.bind(tabletVariantMiddleware),
        checkRequiredFieldsCNTV: tabletVariantMiddleware.checkRequiredFieldsCNPV.bind(tabletVariantMiddleware),
        checkDuplicateCNTV: tabletVariantMiddleware.checkDuplicateCNPV.bind(tabletVariantMiddleware),
        checkDuplicateColor: tabletVariantMiddleware.checkDuplicateColor.bind(tabletVariantMiddleware)
    },

    updateTabletVariant: {
        checkForUTV: tabletVariantMiddleware.checkForUPV.bind(tabletVariantMiddleware),
        checkRequiredFieldsUTV: tabletVariantMiddleware.checkRequiredFieldsUPV.bind(tabletVariantMiddleware)
    },

    deleteTabletVariant: {
        checkState: tabletVariantMiddleware.checkState.bind(tabletVariantMiddleware)
    }
}