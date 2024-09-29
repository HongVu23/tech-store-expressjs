const asyncHandler = require('express-async-handler')
const SmartPhoneDetailController = require('../classes/SmartPhoneDetailController')

// create new smartPhone detail controller object
const smartPhoneDetailController = new SmartPhoneDetailController()

module.exports = {
    getSmartPhoneDetail: asyncHandler(smartPhoneDetailController.getProductDetail.bind(smartPhoneDetailController)),
    createNewSmartPhoneDetail: asyncHandler(smartPhoneDetailController.createNewProductDetail.bind(smartPhoneDetailController)),
    updateSmartPhoneDetail: asyncHandler(smartPhoneDetailController.updateProductDetail.bind(smartPhoneDetailController)),
    deleteSmartPhoneDetail: asyncHandler(smartPhoneDetailController.deleteProductDetail.bind(smartPhoneDetailController)),
    
    colorImages: {
        getColorImages: smartPhoneDetailController.getColorImages.bind(smartPhoneDetailController),
        createNewColorImages: asyncHandler(smartPhoneDetailController.createNewColorImages.bind(smartPhoneDetailController)),
        updateColorImages: asyncHandler(smartPhoneDetailController.updateColorImages.bind(smartPhoneDetailController)),
        deleteColorImages: asyncHandler(smartPhoneDetailController.deleteColorImages.bind(smartPhoneDetailController))
    },

    highlightedImages: {
        getHighlightedImages: smartPhoneDetailController.getHighlightedImages.bind(smartPhoneDetailController),
        createNewHighlightedImages: asyncHandler(smartPhoneDetailController.createNewHighlightedImages.bind(smartPhoneDetailController)),
        updateHighlightedImages: asyncHandler(smartPhoneDetailController.updateHighlightedImages.bind(smartPhoneDetailController)),
        deleteHighlightedImages: asyncHandler(smartPhoneDetailController.deleteHighlightedImages.bind(smartPhoneDetailController))
    }
}