const asyncHandler = require('express-async-handler')
const TabletController = require('../classes/TabletController')

// create new tablet controller object
const tabletController = new TabletController()

module.exports = {
    getAllTablets: asyncHandler(tabletController.getAllProducts.bind(tabletController)),
    createNewTablet: asyncHandler(tabletController.createNewProduct.bind(tabletController)),
    updateTablet: asyncHandler(tabletController.updateProduct.bind(tabletController)),
    deleteTablet: asyncHandler(tabletController.deleteProduct.bind(tabletController)),
    getTablet: tabletController.getProduct.bind(tabletController),
    getFullTabletsInfos: asyncHandler(tabletController.getFullProductsInfos.bind(tabletController)),
    getFullTabletInfos: asyncHandler(tabletController.getFullProductInfos.bind(tabletController)),
    tabletFilter: asyncHandler(tabletController.productFilter.bind(tabletController))
}