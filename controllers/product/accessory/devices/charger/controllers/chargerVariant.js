const asyncHandler = require('express-async-handler')
const ChargerVariantController = require('../classes/ChargerVariantController')

// create new charger variant controller object
const chargerVariantController = new ChargerVariantController()

module.exports = {
    getAllChargerVariants: asyncHandler(chargerVariantController.getAllProductVariants.bind(chargerVariantController)),
    createNewChargerVariant: asyncHandler(chargerVariantController.createNewProductVariant.bind(chargerVariantController)),
    updateChargerVariant: asyncHandler(chargerVariantController.updateProductVariant.bind(chargerVariantController)),
    deleteChargerVariant: asyncHandler(chargerVariantController.deleteProductVariant.bind(chargerVariantController)),
    getChargerVariant: chargerVariantController.getProductVariant.bind(chargerVariantController)
}