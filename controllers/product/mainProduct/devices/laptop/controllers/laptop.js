const asyncHandler = require('express-async-handler')
const LaptopController = require('../classes/LaptopController')

// create new laptop controller object
const laptopController = new LaptopController()

module.exports = {
    getAllLaptops: asyncHandler(laptopController.getAllProducts.bind(laptopController)),
    createNewLaptop: asyncHandler(laptopController.createNewProduct.bind(laptopController)),
    updateLaptop: asyncHandler(laptopController.updateProduct.bind(laptopController)),
    deleteLaptop: asyncHandler(laptopController.deleteProduct.bind(laptopController)),
    getLaptop: laptopController.getProduct.bind(laptopController),
    getFullLaptopsInfos: asyncHandler(laptopController.getFullProductsInfos.bind(laptopController)),
    getFullLaptopInfos: asyncHandler(laptopController.getFullProductInfos.bind(laptopController)),
    laptopFilter: asyncHandler(laptopController.productFilter.bind(laptopController))
}