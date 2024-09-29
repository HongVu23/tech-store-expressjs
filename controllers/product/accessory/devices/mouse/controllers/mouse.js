const asyncHandler = require('express-async-handler')
const MouseController = require('../classes/MouseController')

// create new mouse controller object
const mouseController = new MouseController()

module.exports = {
    getAllMouses: asyncHandler(mouseController.getAllProducts.bind(mouseController)),
    createNewMouse: asyncHandler(mouseController.createNewProduct.bind(mouseController)),
    updateMouse: asyncHandler(mouseController.updateProduct.bind(mouseController)),
    deleteMouse: asyncHandler(mouseController.deleteProduct.bind(mouseController)),
    getMouse: mouseController.getProduct.bind(mouseController),
    getFullMousesInfos: asyncHandler(mouseController.getFullProductsInfos.bind(mouseController)),
    getFullMouseInfos: asyncHandler(mouseController.getFullProductInfos.bind(mouseController)),
    mouseFilter: asyncHandler(mouseController.productFilter.bind(mouseController))
}