const asyncHandler = require('express-async-handler')
const CableController = require('../classes/CableController')

// create new cable controller object
const cableController = new CableController()

module.exports = {
    getAllCables: asyncHandler(cableController.getAllProducts.bind(cableController)),
    createNewCable: asyncHandler(cableController.createNewProduct.bind(cableController)),
    updateCable: asyncHandler(cableController.updateProduct.bind(cableController)),
    deleteCable: asyncHandler(cableController.deleteProduct.bind(cableController)),
    getCable: cableController.getProduct.bind(cableController),
    getFullCablesInfos: asyncHandler(cableController.getFullProductsInfos.bind(cableController)),
    getFullCableInfos: asyncHandler(cableController.getFullProductInfos.bind(cableController)),
    cableFilter: asyncHandler(cableController.productFilter.bind(cableController))
}