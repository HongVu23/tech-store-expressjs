const asyncHandler = require('express-async-handler')
const SmartPhoneController = require('../classes/SmartPhoneController')

// create new smartPhone controller object
const smartPhoneController = new SmartPhoneController()

module.exports = {
    getAllSmartPhones: asyncHandler(smartPhoneController.getAllProducts.bind(smartPhoneController)),
    createNewSmartPhone: asyncHandler(smartPhoneController.createNewProduct.bind(smartPhoneController)),
    updateSmartPhone: asyncHandler(smartPhoneController.updateProduct.bind(smartPhoneController)),
    deleteSmartPhone: asyncHandler(smartPhoneController.deleteProduct.bind(smartPhoneController)),
    getSmartPhone: smartPhoneController.getProduct.bind(smartPhoneController),
    getFullSmartPhonesInfos: asyncHandler(smartPhoneController.getFullProductsInfos.bind(smartPhoneController)),
    getFullSmartPhoneInfos: asyncHandler(smartPhoneController.getFullProductInfos.bind(smartPhoneController)),
    smartPhoneFilter: asyncHandler(smartPhoneController.productFilter.bind(smartPhoneController))
}