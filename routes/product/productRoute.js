const express = require('express')
const router = express.Router()
const laptopController = require('../../controllers/product/mainProduct/devices/laptop/controllers/laptop')
const smartPhoneController = require('../../controllers/product/mainProduct/devices/smartPhone/controllers/smartPhone')
const smartWatchController = require('../../controllers/product/mainProduct/devices/smartWatch/controllers/smartWatch')
const tabletController = require('../../controllers/product/mainProduct/devices/tablet/controllers/tablet')
const cableController = require('../../controllers/product/accessory/devices/cable/controllers/cable')
const chargerController = require('../../controllers/product/accessory/devices/charger/controllers/charger')
const headphoneController = require('../../controllers/product/accessory/devices/headphone/controllers/headphone')
const keyboardController = require('../../controllers/product/accessory/devices/keyboard/controllers/keyboard')
const mouseController = require('../../controllers/product/accessory/devices/mouse/controllers/mouse')
const productController = require('../../controllers/product/productController')

// routing for list --- /products/list/(productType)
router.route('/list/laptops')
    .get(laptopController.getFullLaptopsInfos)

router.route('/list/laptops/filter')
    .get(laptopController.laptopFilter)



router.route('/list/smartPhones')
    .get(smartPhoneController.getFullSmartPhonesInfos)

router.route('/list/smartPhones/filter')
    .get(smartPhoneController.smartPhoneFilter)



router.route('/list/tablets')
    .get(tabletController.getFullTabletsInfos)

router.route('/list/tablets/filter')
    .get(tabletController.tabletFilter)



router.route('/list/smartWatches')
    .get(smartWatchController.getFullSmartWatchsInfos)

router.route('/list/smartWatches/filter')
    .get(smartWatchController.smartWatchFilter)



router.route('/list/cables')
    .get(cableController.getFullCablesInfos)

router.route('/list/cables/filter')
    .get(cableController.cableFilter)



router.route('/list/chargers')
    .get(chargerController.getFullChargersInfos)

router.route('/list/chargers/filter')
    .get(chargerController.chargerFilter)



router.route('/list/headphones')
    .get(headphoneController.getFullHeadphonesInfos)

router.route('/list/headphones/filter')
    .get(headphoneController.headphoneFilter)



router.route('/list/keyboards')
    .get(keyboardController.getFullKeyboardsInfos)

router.route('/list/keyboards/filter')
    .get(keyboardController.keyboardFilter)

    

router.route('/list/mouses')
    .get(mouseController.getFullMousesInfos)

router.route('/list/mouses/filter')
    .get(mouseController.mouseFilter)



// routing for search products
router.route('/list/search')
    .get(productController.searchProduct)


module.exports = router