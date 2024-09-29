const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const chargerController = require('../../../controllers/product/accessory/devices/charger/controllers/charger')
const chargerMiddleware = require('../../../middlewares/product/accessory/devices/charger/middlewares/charger')
const chargerVariantController = require('../../../controllers/product/accessory/devices/charger/controllers/chargerVariant')
const chargerVariantMiddleware = require('../../../middlewares/product/accessory/devices/charger/middlewares/chargerVariant')
const chargerDetailController = require('../../../controllers/product/accessory/devices/charger/controllers/chargerDetail')
const chargerDetailMiddleware = require('../../../middlewares/product/accessory/devices/charger/middlewares/chargerDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for charger --- products/chargers
router.route('/')
    .get(
        chargerController.getAllChargers
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        chargerMiddleware.createNewCharger.checkRequiredFieldsCNC,
        chargerMiddleware.createNewCharger.checkDuplicateCharger,
        chargerController.createNewCharger
    )

// routing for charger --- products/charger/:chargerId
router.route('/:chargerId')
    .get(
        chargerMiddleware.checkIdExistence,
        chargerController.getCharger
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        chargerMiddleware.updateCharger.checkRequiredFieldsUC,
        chargerMiddleware.checkIdExistence,
        chargerController.updateCharger
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        chargerMiddleware.checkIdExistence,
        chargerMiddleware.deleteCharger.checkVariants,
        chargerController.deleteCharger
    )



// routing for full charger informations --- products/chargers/:chargerId/fullInfos
router.route('/:chargerId/fullInfos')
    .get(
        chargerMiddleware.checkIdExistence,
        chargerController.getFullChargerInfos
    )    



// routing for charger variant --- products/chargers/:chargerId/variants
router.route('/:chargerId/variants')
    .get(
        chargerVariantMiddleware.checkIdExistence,
        chargerVariantController.getAllChargerVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        chargerVariantMiddleware.createNewChargerVariant.checkForCNCV,
        chargerVariantMiddleware.checkIdExistence,
        chargerVariantMiddleware.createNewChargerVariant.checkRequiredFieldsCNCV,
        chargerVariantMiddleware.createNewChargerVariant.checkDuplicateCNCV,
        chargerVariantMiddleware.createNewChargerVariant.checkDuplicateColor,
        chargerVariantController.createNewChargerVariant
    )

// routing for charger variant --- products/chargers/:chargerId/variants/:chargerVariantId
router.route('/:chargerId/variants/:chargerVariantId')
    .get(
        chargerVariantMiddleware.checkIdExistence,
        chargerVariantMiddleware.checkVariantIdExistence,
        chargerVariantController.getChargerVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        chargerVariantMiddleware.updateChargerVariant.checkForUCV,
        chargerVariantMiddleware.checkIdExistence,
        chargerVariantMiddleware.checkVariantIdExistence,
        chargerVariantMiddleware.updateChargerVariant.checkRequiredFieldsUCV,
        chargerVariantController.updateChargerVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        chargerVariantMiddleware.checkIdExistence,
        chargerVariantMiddleware.checkVariantIdExistence,
        chargerVariantMiddleware.deleteChargerVariant.checkState,
        chargerVariantController.deleteChargerVariant
    )



// routing for charger detail --- products/chargers/:chargerId/details
router.route('/:chargerId/details')
    .get(
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailController.getChargerDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.createNewChargerDetail.checkRequiredFieldsCNCD,
        chargerDetailMiddleware.createNewChargerDetail.checkDuplicateChargerDetail,
        chargerDetailController.createNewChargerDetail
    )

// routing for charger detail --- products/chargers/:chargerId/details/:chargerDetailId
router.route('/:chargerId/details/:chargerDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.updateChargerDetail.checkRequiredFieldsUCD,
        chargerDetailController.updateChargerDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailController.deleteChargerDetail
    )

// routing for color images of charger detail --- products/chargers/:chargerId/:chargerDetailId/colorImages
router.route('/:chargerId/details/:chargerDetailId/colorImages')
    .get(
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.colorImages.checkRequiredColor,
        chargerDetailMiddleware.colorImages.checkColorExistence,
        chargerDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        chargerDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.colorImages.checkRequiredColor,
        chargerDetailMiddleware.colorImages.checkColorExistence,
        chargerDetailMiddleware.colorImages.checkImagesExistence,
        chargerDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        chargerDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.colorImages.checkRequiredColor,
        chargerDetailMiddleware.colorImages.checkColorExistence,
        chargerDetailMiddleware.colorImages.checkImagesExistence,
        chargerDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of charger detail --- products/chargers/:chargerId/:chargerDetailId/highlightedImages
router.route('/:chargerId/details/:chargerDetailId/highlightedImages')
    .get(
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.highlightedImages.checkHlImagesExistence,
        chargerDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        chargerDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.highlightedImages.checkHlImagesExistence,
        chargerDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        chargerDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        chargerDetailMiddleware.checkIdExistence,
        chargerDetailMiddleware.checkDetailIdExistence,
        chargerDetailMiddleware.highlightedImages.checkHlImagesExistence,
        chargerDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router