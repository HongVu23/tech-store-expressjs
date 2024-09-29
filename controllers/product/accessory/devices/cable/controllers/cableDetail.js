const asyncHandler = require('express-async-handler')
const CableDetailController = require('../classes/CableDetailController')

// create new cable detail controller object
const cableDetailController = new CableDetailController()

module.exports = {
    getCableDetail: asyncHandler(cableDetailController.getProductDetail.bind(cableDetailController)),
    createNewCableDetail: asyncHandler(cableDetailController.createNewProductDetail.bind(cableDetailController)),
    updateCableDetail: asyncHandler(cableDetailController.updateProductDetail.bind(cableDetailController)),
    deleteCableDetail: asyncHandler(cableDetailController.deleteProductDetail.bind(cableDetailController)),
    
    colorImages: {
        getColorImages: cableDetailController.getColorImages.bind(cableDetailController),
        createNewColorImages: asyncHandler(cableDetailController.createNewColorImages.bind(cableDetailController)),
        updateColorImages: asyncHandler(cableDetailController.updateColorImages.bind(cableDetailController)),
        deleteColorImages: asyncHandler(cableDetailController.deleteColorImages.bind(cableDetailController))
    },

    highlightedImages: {
        getHighlightedImages: cableDetailController.getHighlightedImages.bind(cableDetailController),
        createNewHighlightedImages: asyncHandler(cableDetailController.createNewHighlightedImages.bind(cableDetailController)),
        updateHighlightedImages: asyncHandler(cableDetailController.updateHighlightedImages.bind(cableDetailController)),
        deleteHighlightedImages: asyncHandler(cableDetailController.deleteHighlightedImages.bind(cableDetailController))
    }
}