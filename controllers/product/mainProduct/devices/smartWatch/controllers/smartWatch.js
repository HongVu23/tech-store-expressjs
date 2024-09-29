const asyncHandler = require('express-async-handler')
const SmartWatchController = require('../classes/SmartWatchController')

// create new smartWatch controller object
const smartWatchController = new SmartWatchController()

module.exports = {
    getAllSmartWatchs: asyncHandler(smartWatchController.getAllProducts.bind(smartWatchController)),
    createNewSmartWatch: asyncHandler(smartWatchController.createNewProduct.bind(smartWatchController)),
    updateSmartWatch: asyncHandler(smartWatchController.updateProduct.bind(smartWatchController)),
    deleteSmartWatch: asyncHandler(smartWatchController.deleteProduct.bind(smartWatchController)),
    getSmartWatch: smartWatchController.getProduct.bind(smartWatchController),
    getFullSmartWatchsInfos: asyncHandler(smartWatchController.getFullProductsInfos.bind(smartWatchController)),
    getFullSmartWatchInfos: asyncHandler(smartWatchController.getFullProductInfos.bind(smartWatchController)),
    smartWatchFilter: asyncHandler(smartWatchController.productFilter.bind(smartWatchController))
}