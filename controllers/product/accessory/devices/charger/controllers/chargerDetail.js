const asyncHandler = require('express-async-handler')
const ChargerDetailController = require('../classes/ChargerDetailController')

// create new charger detail controller object
const chargerDetailController = new ChargerDetailController()

module.exports = {
    getChargerDetail: asyncHandler(chargerDetailController.getProductDetail.bind(chargerDetailController)),
    createNewChargerDetail: asyncHandler(chargerDetailController.createNewProductDetail.bind(chargerDetailController)),
    updateChargerDetail: asyncHandler(chargerDetailController.updateProductDetail.bind(chargerDetailController)),
    deleteChargerDetail: asyncHandler(chargerDetailController.deleteProductDetail.bind(chargerDetailController)),
    
    colorImages: {
        getColorImages: chargerDetailController.getColorImages.bind(chargerDetailController),
        createNewColorImages: asyncHandler(chargerDetailController.createNewColorImages.bind(chargerDetailController)),
        updateColorImages: asyncHandler(chargerDetailController.updateColorImages.bind(chargerDetailController)),
        deleteColorImages: asyncHandler(chargerDetailController.deleteColorImages.bind(chargerDetailController))
    },

    highlightedImages: {
        getHighlightedImages: chargerDetailController.getHighlightedImages.bind(chargerDetailController),
        createNewHighlightedImages: asyncHandler(chargerDetailController.createNewHighlightedImages.bind(chargerDetailController)),
        updateHighlightedImages: asyncHandler(chargerDetailController.updateHighlightedImages.bind(chargerDetailController)),
        deleteHighlightedImages: asyncHandler(chargerDetailController.deleteHighlightedImages.bind(chargerDetailController))
    }
}