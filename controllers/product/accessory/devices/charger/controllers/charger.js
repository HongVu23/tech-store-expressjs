const asyncHandler = require('express-async-handler')
const ChargerController = require('../classes/ChargerController')

// create new charger controller object
const chargerController = new ChargerController()

module.exports = {
    getAllChargers: asyncHandler(chargerController.getAllProducts.bind(chargerController)),
    createNewCharger: asyncHandler(chargerController.createNewProduct.bind(chargerController)),
    updateCharger: asyncHandler(chargerController.updateProduct.bind(chargerController)),
    deleteCharger: asyncHandler(chargerController.deleteProduct.bind(chargerController)),
    getCharger: chargerController.getProduct.bind(chargerController),
    getFullChargersInfos: asyncHandler(chargerController.getFullProductsInfos.bind(chargerController)),
    getFullChargerInfos: asyncHandler(chargerController.getFullProductInfos.bind(chargerController)),
    chargerFilter: asyncHandler(chargerController.productFilter.bind(chargerController))
}