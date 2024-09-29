const asyncHandler = require('express-async-handler')
const TabletDetailController = require('../classes/TabletDetailController')

// create new tablet detail controller object
const tabletDetailController = new TabletDetailController()

module.exports = {
    getTabletDetail: asyncHandler(tabletDetailController.getProductDetail.bind(tabletDetailController)),
    createNewTabletDetail: asyncHandler(tabletDetailController.createNewProductDetail.bind(tabletDetailController)),
    updateTabletDetail: asyncHandler(tabletDetailController.updateProductDetail.bind(tabletDetailController)),
    deleteTabletDetail: asyncHandler(tabletDetailController.deleteProductDetail.bind(tabletDetailController)),
    
    colorImages: {
        getColorImages: tabletDetailController.getColorImages.bind(tabletDetailController),
        createNewColorImages: asyncHandler(tabletDetailController.createNewColorImages.bind(tabletDetailController)),
        updateColorImages: asyncHandler(tabletDetailController.updateColorImages.bind(tabletDetailController)),
        deleteColorImages: asyncHandler(tabletDetailController.deleteColorImages.bind(tabletDetailController))
    },

    highlightedImages: {
        getHighlightedImages: tabletDetailController.getHighlightedImages.bind(tabletDetailController),
        createNewHighlightedImages: asyncHandler(tabletDetailController.createNewHighlightedImages.bind(tabletDetailController)),
        updateHighlightedImages: asyncHandler(tabletDetailController.updateHighlightedImages.bind(tabletDetailController)),
        deleteHighlightedImages: asyncHandler(tabletDetailController.deleteHighlightedImages.bind(tabletDetailController))
    }
}