const express = require('express')
const router = express.Router()
const productInventoryController = require('../../controllers/stock/productInventoryController')
const productInventoryMiddleware = require('../../middlewares/stock/productInventoryMiddleware')
const importedProductController = require('../../controllers/stock/importedProductController')
const importedProductMiddleware = require('../../middlewares/stock/importedProductMiddleware')
const verifyJWT = require('../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../middlewares/auth/verifyAdminRole')

// verify admin
router.use(verifyJWT)
router.use(verifyAdminRole)

// routing for imported products --- /stock/importedProducts
router.route('/')
    .get(
        importedProductMiddleware.checkValidDate,
        importedProductController.getImportedProductsInDay
    )



// routing for product inventory --- /stock/productInventory/:productVariantId
router.route('/productInventory/:productVariantId')
    .patch(
        productInventoryMiddleware.checkVariantIdExistence,
        productInventoryController.addProductQuantity
    )



module.exports = router