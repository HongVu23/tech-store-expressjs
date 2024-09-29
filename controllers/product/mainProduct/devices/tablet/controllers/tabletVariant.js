const asyncHandler = require('express-async-handler')
const TabletVariantController = require('../classes/TabletVariantController')

// create new tablet variant controller object
const tabletVariantController = new TabletVariantController()

module.exports = {
    getAllTabletVariants: asyncHandler(tabletVariantController.getAllProductVariants.bind(tabletVariantController)),
    createNewTabletVariant: asyncHandler(tabletVariantController.createNewProductVariant.bind(tabletVariantController)),
    updateTabletVariant: asyncHandler(tabletVariantController.updateProductVariant.bind(tabletVariantController)),
    deleteTabletVariant: asyncHandler(tabletVariantController.deleteProductVariant.bind(tabletVariantController)),
    getTabletVariant: tabletVariantController.getProductVariant.bind(tabletVariantController)
}