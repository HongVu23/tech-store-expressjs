const asyncHandler = require('express-async-handler')
const HeadphoneDetailController = require('../classes/HeadphoneDetailController')

// create new headphone detail controller object
const headphoneDetailController = new HeadphoneDetailController()

module.exports = {
    getHeadphoneDetail: asyncHandler(headphoneDetailController.getProductDetail.bind(headphoneDetailController)),
    createNewHeadphoneDetail: asyncHandler(headphoneDetailController.createNewProductDetail.bind(headphoneDetailController)),
    updateHeadphoneDetail: asyncHandler(headphoneDetailController.updateProductDetail.bind(headphoneDetailController)),
    deleteHeadphoneDetail: asyncHandler(headphoneDetailController.deleteProductDetail.bind(headphoneDetailController)),
    
    colorImages: {
        getColorImages: headphoneDetailController.getColorImages.bind(headphoneDetailController),
        createNewColorImages: asyncHandler(headphoneDetailController.createNewColorImages.bind(headphoneDetailController)),
        updateColorImages: asyncHandler(headphoneDetailController.updateColorImages.bind(headphoneDetailController)),
        deleteColorImages: asyncHandler(headphoneDetailController.deleteColorImages.bind(headphoneDetailController))
    },

    highlightedImages: {
        getHighlightedImages: headphoneDetailController.getHighlightedImages.bind(headphoneDetailController),
        createNewHighlightedImages: asyncHandler(headphoneDetailController.createNewHighlightedImages.bind(headphoneDetailController)),
        updateHighlightedImages: asyncHandler(headphoneDetailController.updateHighlightedImages.bind(headphoneDetailController)),
        deleteHighlightedImages: asyncHandler(headphoneDetailController.deleteHighlightedImages.bind(headphoneDetailController))
    }
}