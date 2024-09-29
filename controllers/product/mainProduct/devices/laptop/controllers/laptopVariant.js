const asyncHandler = require('express-async-handler')
const LaptopVariantController = require('../classes/LaptopVariantController')

// create new laptop variant controller object
const laptopVariantController = new LaptopVariantController()

module.exports = {
    getAllLaptopVariants: asyncHandler(laptopVariantController.getAllProductVariants.bind(laptopVariantController)),
    createNewLaptopVariant: asyncHandler(laptopVariantController.createNewProductVariant.bind(laptopVariantController)),
    updateLaptopVariant: asyncHandler(laptopVariantController.updateProductVariant.bind(laptopVariantController)),
    deleteLaptopVariant: asyncHandler(laptopVariantController.deleteProductVariant.bind(laptopVariantController)),
    getLaptopVariant: laptopVariantController.getProductVariant.bind(laptopVariantController)
}