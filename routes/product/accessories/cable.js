const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const cableController = require('../../../controllers/product/accessory/devices/cable/controllers/cable')
const cableMiddleware = require('../../../middlewares/product/accessory/devices/cable/middlewares/cable')
const cableVariantController = require('../../../controllers/product/accessory/devices/cable/controllers/cableVariant')
const cableVariantMiddleware = require('../../../middlewares/product/accessory/devices/cable/middlewares/cableVariant')
const cableDetailController = require('../../../controllers/product/accessory/devices/cable/controllers/cableDetail')
const cableDetailMiddleware = require('../../../middlewares/product/accessory/devices/cable/middlewares/cableDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for cable --- products/cables
router.route('/')
    .get(
        cableController.getAllCables
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        cableMiddleware.createNewCable.checkRequiredFieldsCNC,
        cableMiddleware.createNewCable.checkDuplicateCable,
        cableController.createNewCable
    )

// routing for cable --- products/cable/:cableId
router.route('/:cableId')
    .get(
        cableMiddleware.checkIdExistence,
        cableController.getCable
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        cableMiddleware.updateCable.checkRequiredFieldsUC,
        cableMiddleware.checkIdExistence,
        cableController.updateCable
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        cableMiddleware.checkIdExistence,
        cableMiddleware.deleteCable.checkVariants,
        cableController.deleteCable
    )



// routing for full cable informations --- products/cables/:cableId/fullInfos
router.route('/:cableId/fullInfos')
    .get(
        cableMiddleware.checkIdExistence,
        cableController.getFullCableInfos
    )



// routing for cable variant --- products/cables/:cableId/variants
router.route('/:cableId/variants')
    .get(
        cableVariantMiddleware.checkIdExistence,
        cableVariantController.getAllCableVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        cableVariantMiddleware.createNewCableVariant.checkForCNCV,
        cableVariantMiddleware.checkIdExistence,
        cableVariantMiddleware.createNewCableVariant.checkRequiredFieldsCNCV,
        cableVariantMiddleware.createNewCableVariant.checkDuplicateCNCV,
        cableVariantMiddleware.createNewCableVariant.checkDuplicateColor,
        cableVariantController.createNewCableVariant
    )

// routing for cable variant --- products/cables/:cableId/variants/:cableVariantId
router.route('/:cableId/variants/:cableVariantId')
    .get(
        cableVariantMiddleware.checkIdExistence,
        cableVariantMiddleware.checkVariantIdExistence,
        cableVariantController.getCableVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        cableVariantMiddleware.updateCableVariant.checkForUCV,
        cableVariantMiddleware.checkIdExistence,
        cableVariantMiddleware.checkVariantIdExistence,
        cableVariantMiddleware.updateCableVariant.checkRequiredFieldsUCV,
        cableVariantController.updateCableVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        cableVariantMiddleware.checkIdExistence,
        cableVariantMiddleware.checkVariantIdExistence,
        cableVariantMiddleware.deleteCableVariant.checkState,
        cableVariantController.deleteCableVariant
    )



// routing for cable detail --- products/cables/:cableId/details
router.route('/:cableId/details')
    .get(
        cableDetailMiddleware.checkIdExistence,
        cableDetailController.getCableDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.createNewCableDetail.checkRequiredFieldsCNCD,
        cableDetailMiddleware.createNewCableDetail.checkDuplicateCableDetail,
        cableDetailController.createNewCableDetail
    )

// routing for cable detail --- products/cables/:cableId/details/:cableDetailId
router.route('/:cableId/details/:cableDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.updateCableDetail.checkRequiredFieldsUCD,
        cableDetailController.updateCableDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailController.deleteCableDetail
    )

// routing for color images of cable detail --- products/cables/:cableId/:cableDetailId/colorImages
router.route('/:cableId/details/:cableDetailId/colorImages')
    .get(
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.colorImages.checkRequiredColor,
        cableDetailMiddleware.colorImages.checkColorExistence,
        cableDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        cableDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.colorImages.checkRequiredColor,
        cableDetailMiddleware.colorImages.checkColorExistence,
        cableDetailMiddleware.colorImages.checkImagesExistence,
        cableDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        cableDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.colorImages.checkRequiredColor,
        cableDetailMiddleware.colorImages.checkColorExistence,
        cableDetailMiddleware.colorImages.checkImagesExistence,
        cableDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of cable detail --- products/cables/:cableId/:cableDetailId/highlightedImages
router.route('/:cableId/details/:cableDetailId/highlightedImages')
    .get(
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.highlightedImages.checkHlImagesExistence,
        cableDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        cableDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.highlightedImages.checkHlImagesExistence,
        cableDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        cableDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        cableDetailMiddleware.checkIdExistence,
        cableDetailMiddleware.checkDetailIdExistence,
        cableDetailMiddleware.highlightedImages.checkHlImagesExistence,
        cableDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router