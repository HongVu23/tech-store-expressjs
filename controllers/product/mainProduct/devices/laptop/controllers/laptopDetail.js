const asyncHandler = require('express-async-handler')
const LaptopDetailController = require('../classes/LaptopDetailController')

// create new laptop detail controller object
const laptopDetailController = new LaptopDetailController()

module.exports = {
    getLaptopDetail: asyncHandler(laptopDetailController.getProductDetail.bind(laptopDetailController)),
    createNewLaptopDetail: asyncHandler(laptopDetailController.createNewProductDetail.bind(laptopDetailController)),
    updateLaptopDetail: asyncHandler(laptopDetailController.updateProductDetail.bind(laptopDetailController)),
    deleteLaptopDetail: asyncHandler(laptopDetailController.deleteProductDetail.bind(laptopDetailController)),
    
    colorImages: {
        getColorImages: laptopDetailController.getColorImages.bind(laptopDetailController),
        createNewColorImages: asyncHandler(laptopDetailController.createNewColorImages.bind(laptopDetailController)),
        updateColorImages: asyncHandler(laptopDetailController.updateColorImages.bind(laptopDetailController)),
        deleteColorImages: asyncHandler(laptopDetailController.deleteColorImages.bind(laptopDetailController))
    },

    highlightedImages: {
        getHighlightedImages: laptopDetailController.getHighlightedImages.bind(laptopDetailController),
        createNewHighlightedImages: asyncHandler(laptopDetailController.createNewHighlightedImages.bind(laptopDetailController)),
        updateHighlightedImages: asyncHandler(laptopDetailController.updateHighlightedImages.bind(laptopDetailController)),
        deleteHighlightedImages: asyncHandler(laptopDetailController.deleteHighlightedImages.bind(laptopDetailController))
    }
}