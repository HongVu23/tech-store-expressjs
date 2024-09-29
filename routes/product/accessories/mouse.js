const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const mouseController = require('../../../controllers/product/accessory/devices/mouse/controllers/mouse')
const mouseMiddleware = require('../../../middlewares/product/accessory/devices/mouse/middlewares/mouse')
const mouseVariantController = require('../../../controllers/product/accessory/devices/mouse/controllers/mouseVariant')
const mouseVariantMiddleware = require('../../../middlewares/product/accessory/devices/mouse/middlewares/mouseVariant')
const mouseDetailController = require('../../../controllers/product/accessory/devices/mouse/controllers/mouseDetail')
const mouseDetailMiddleware = require('../../../middlewares/product/accessory/devices/mouse/middlewares/mouseDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for mouse --- products/mouses
router.route('/')
    .get(
        mouseController.getAllMouses
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        mouseMiddleware.createNewMouse.checkRequiredFieldsCNM,
        mouseMiddleware.createNewMouse.checkDuplicateMouse,
        mouseController.createNewMouse
    )

// routing for mouse --- products/mouse/:mouseId
router.route('/:mouseId')
    .get(
        mouseMiddleware.checkIdExistence,
        mouseController.getMouse
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        mouseMiddleware.updateMouse.checkRequiredFieldsUM,
        mouseMiddleware.checkIdExistence,
        mouseController.updateMouse
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        mouseMiddleware.checkIdExistence,
        mouseMiddleware.deleteMouse.checkVariants,
        mouseController.deleteMouse
    )



// routing for full mouse informations --- products/mouses/:mouseId/fullInfos
router.route('/:mouseId/fullInfos')
    .get(
        mouseMiddleware.checkIdExistence,
        mouseController.getFullMouseInfos
    )    



// routing for mouse variant --- products/mouses/:mouseId/variants
router.route('/:mouseId/variants')
    .get(
        mouseVariantMiddleware.checkIdExistence,
        mouseVariantController.getAllMouseVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        mouseVariantMiddleware.createNewMouseVariant.checkForCNMV,
        mouseVariantMiddleware.checkIdExistence,
        mouseVariantMiddleware.createNewMouseVariant.checkRequiredFieldsCNMV,
        mouseVariantMiddleware.createNewMouseVariant.checkDuplicateCNMV,
        mouseVariantMiddleware.createNewMouseVariant.checkDuplicateColor,
        mouseVariantController.createNewMouseVariant
    )

// routing for mouse variant --- products/mouses/:mouseId/variants/:mouseVariantId
router.route('/:mouseId/variants/:mouseVariantId')
    .get(
        mouseVariantMiddleware.checkIdExistence,
        mouseVariantMiddleware.checkVariantIdExistence,
        mouseVariantController.getMouseVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        mouseVariantMiddleware.updateMouseVariant.checkForUMV,
        mouseVariantMiddleware.checkIdExistence,
        mouseVariantMiddleware.checkVariantIdExistence,
        mouseVariantMiddleware.updateMouseVariant.checkRequiredFieldsUMV,
        mouseVariantController.updateMouseVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        mouseVariantMiddleware.checkIdExistence,
        mouseVariantMiddleware.checkVariantIdExistence,
        mouseVariantMiddleware.deleteMouseVariant.checkState,
        mouseVariantController.deleteMouseVariant
    )



// routing for mouse detail --- products/mouses/:mouseId/details
router.route('/:mouseId/details')
    .get(
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailController.getMouseDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.createNewMouseDetail.checkRequiredFieldsCNMD,
        mouseDetailMiddleware.createNewMouseDetail.checkDuplicateMouseDetail,
        mouseDetailController.createNewMouseDetail
    )

// routing for mouse detail --- products/mouses/:mouseId/details/:mouseDetailId
router.route('/:mouseId/details/:mouseDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.updateMouseDetail.checkRequiredFieldsUMD,
        mouseDetailController.updateMouseDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailController.deleteMouseDetail
    )

// routing for color images of mouse detail --- products/mouses/:mouseId/:mouseDetailId/colorImages
router.route('/:mouseId/details/:mouseDetailId/colorImages')
    .get(
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.colorImages.checkRequiredColor,
        mouseDetailMiddleware.colorImages.checkColorExistence,
        mouseDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        mouseDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.colorImages.checkRequiredColor,
        mouseDetailMiddleware.colorImages.checkColorExistence,
        mouseDetailMiddleware.colorImages.checkImagesExistence,
        mouseDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        mouseDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.colorImages.checkRequiredColor,
        mouseDetailMiddleware.colorImages.checkColorExistence,
        mouseDetailMiddleware.colorImages.checkImagesExistence,
        mouseDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of mouse detail --- products/mouses/:mouseId/:mouseDetailId/highlightedImages
router.route('/:mouseId/details/:mouseDetailId/highlightedImages')
    .get(
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.highlightedImages.checkHlImagesExistence,
        mouseDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        mouseDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.highlightedImages.checkHlImagesExistence,
        mouseDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        mouseDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        mouseDetailMiddleware.checkIdExistence,
        mouseDetailMiddleware.checkDetailIdExistence,
        mouseDetailMiddleware.highlightedImages.checkHlImagesExistence,
        mouseDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router