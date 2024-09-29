const asyncHandler = require('express-async-handler')
const MouseDetailController = require('../classes/MouseDetailController')

// create new mouse detail controller object
const mouseDetailController = new MouseDetailController()

module.exports = {
    getMouseDetail: asyncHandler(mouseDetailController.getProductDetail.bind(mouseDetailController)),
    createNewMouseDetail: asyncHandler(mouseDetailController.createNewProductDetail.bind(mouseDetailController)),
    updateMouseDetail: asyncHandler(mouseDetailController.updateProductDetail.bind(mouseDetailController)),
    deleteMouseDetail: asyncHandler(mouseDetailController.deleteProductDetail.bind(mouseDetailController)),
    
    colorImages: {
        getColorImages: mouseDetailController.getColorImages.bind(mouseDetailController),
        createNewColorImages: asyncHandler(mouseDetailController.createNewColorImages.bind(mouseDetailController)),
        updateColorImages: asyncHandler(mouseDetailController.updateColorImages.bind(mouseDetailController)),
        deleteColorImages: asyncHandler(mouseDetailController.deleteColorImages.bind(mouseDetailController))
    },

    highlightedImages: {
        getHighlightedImages: mouseDetailController.getHighlightedImages.bind(mouseDetailController),
        createNewHighlightedImages: asyncHandler(mouseDetailController.createNewHighlightedImages.bind(mouseDetailController)),
        updateHighlightedImages: asyncHandler(mouseDetailController.updateHighlightedImages.bind(mouseDetailController)),
        deleteHighlightedImages: asyncHandler(mouseDetailController.deleteHighlightedImages.bind(mouseDetailController))
    }
}