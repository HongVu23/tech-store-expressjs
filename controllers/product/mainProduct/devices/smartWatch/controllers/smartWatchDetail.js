const asyncHandler = require('express-async-handler')
const SmartWatchDetailController = require('../classes/SmartWatchDetailController')

// create new smartWatch detail controller object
const smartWatchDetailController = new SmartWatchDetailController()

module.exports = {
    getSmartWatchDetail: asyncHandler(smartWatchDetailController.getProductDetail.bind(smartWatchDetailController)),
    createNewSmartWatchDetail: asyncHandler(smartWatchDetailController.createNewProductDetail.bind(smartWatchDetailController)),
    updateSmartWatchDetail: asyncHandler(smartWatchDetailController.updateProductDetail.bind(smartWatchDetailController)),
    deleteSmartWatchDetail: asyncHandler(smartWatchDetailController.deleteProductDetail.bind(smartWatchDetailController)),
    
    colorImages: {
        getColorImages: smartWatchDetailController.getColorImages.bind(smartWatchDetailController),
        createNewColorImages: asyncHandler(smartWatchDetailController.createNewColorImages.bind(smartWatchDetailController)),
        updateColorImages: asyncHandler(smartWatchDetailController.updateColorImages.bind(smartWatchDetailController)),
        deleteColorImages: asyncHandler(smartWatchDetailController.deleteColorImages.bind(smartWatchDetailController))
    },

    highlightedImages: {
        getHighlightedImages: smartWatchDetailController.getHighlightedImages.bind(smartWatchDetailController),
        createNewHighlightedImages: asyncHandler(smartWatchDetailController.createNewHighlightedImages.bind(smartWatchDetailController)),
        updateHighlightedImages: asyncHandler(smartWatchDetailController.updateHighlightedImages.bind(smartWatchDetailController)),
        deleteHighlightedImages: asyncHandler(smartWatchDetailController.deleteHighlightedImages.bind(smartWatchDetailController))
    }
}