const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const tabletController = require('../../../controllers/product/mainProduct/devices/tablet/controllers/tablet')
const tabletMiddleware = require('../../../middlewares/product/mainProduct/devices/tablet/middlewares/tablet')
const tabletVariantController = require('../../../controllers/product/mainProduct/devices/tablet/controllers/tabletVariant')
const tabletVariantMiddleware = require('../../../middlewares/product/mainProduct/devices/tablet/middlewares/tabletVariant')
const tabletDetailController = require('../../../controllers/product/mainProduct/devices/tablet/controllers/tabletDetail')
const tabletDetailMiddleware = require('../../../middlewares/product/mainProduct/devices/tablet/middlewares/tabletDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for tablet --- products/tablets
router.route('/')
    .get(
        tabletController.getAllTablets
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        tabletMiddleware.createNewTablet.checkRequiredFieldsCNT,
        tabletMiddleware.createNewTablet.checkDuplicateTablet,
        tabletController.createNewTablet
    )

// routing for tablet --- products/tablet/:tabletId
router.route('/:tabletId')
    .get(
        tabletMiddleware.checkIdExistence,
        tabletController.getTablet
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        tabletMiddleware.updateTablet.checkRequiredFieldsUT,
        tabletMiddleware.checkIdExistence,
        tabletController.updateTablet
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        tabletMiddleware.checkIdExistence,
        tabletMiddleware.deleteTablet.checkVariants,
        tabletController.deleteTablet
    )



// routing for full tablet informations --- products/tablets/:tabletId/fullInfos
router.route('/:tabletId/fullInfos')
    .get(
        tabletMiddleware.checkIdExistence,
        tabletController.getFullTabletInfos
    )



// routing for tablet variant --- products/tablets/:tabletId/variants
router.route('/:tabletId/variants')
    .get(
        tabletVariantMiddleware.checkIdExistence,
        tabletVariantController.getAllTabletVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        tabletVariantMiddleware.createNewTabletVariant.checkForCNTV,
        tabletVariantMiddleware.checkIdExistence,
        tabletVariantMiddleware.createNewTabletVariant.checkRequiredFieldsCNTV,
        tabletVariantMiddleware.createNewTabletVariant.checkDuplicateCNTV,
        tabletVariantMiddleware.createNewTabletVariant.checkDuplicateColor,
        tabletVariantController.createNewTabletVariant
    )

// routing for tablet variant --- products/tablets/:tabletId/variants/:tabletVariantId
router.route('/:tabletId/variants/:tabletVariantId')
    .get(
        tabletVariantMiddleware.checkIdExistence,
        tabletVariantMiddleware.checkVariantIdExistence,
        tabletVariantController.getTabletVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        tabletVariantMiddleware.updateTabletVariant.checkForUTV,
        tabletVariantMiddleware.checkIdExistence,
        tabletVariantMiddleware.checkVariantIdExistence,
        tabletVariantMiddleware.updateTabletVariant.checkRequiredFieldsUTV,
        tabletVariantController.updateTabletVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        tabletVariantMiddleware.checkIdExistence,
        tabletVariantMiddleware.checkVariantIdExistence,
        tabletVariantMiddleware.deleteTabletVariant.checkState,
        tabletVariantController.deleteTabletVariant
    )



// routing for tablet detail --- products/tablets/:tabletId/details
router.route('/:tabletId/details')
    .get(
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailController.getTabletDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.createNewTabletDetail.checkRequiredFieldsCNTD,
        tabletDetailMiddleware.createNewTabletDetail.checkDuplicateTabletDetail,
        tabletDetailController.createNewTabletDetail
    )

// routing for tablet detail --- products/tablets/:tabletId/details/:tabletDetailId
router.route('/:tabletId/details/:tabletDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.updateTabletDetail.checkRequiredFieldsUTD,
        tabletDetailController.updateTabletDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailController.deleteTabletDetail
    )

// routing for color images of tablet detail --- products/tablets/:tabletId/:tabletDetailId/colorImages
router.route('/:tabletId/details/:tabletDetailId/colorImages')
    .get(
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.colorImages.checkRequiredColor,
        tabletDetailMiddleware.colorImages.checkColorExistence,
        tabletDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        tabletDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.colorImages.checkRequiredColor,
        tabletDetailMiddleware.colorImages.checkColorExistence,
        tabletDetailMiddleware.colorImages.checkImagesExistence,
        tabletDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        tabletDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.colorImages.checkRequiredColor,
        tabletDetailMiddleware.colorImages.checkColorExistence,
        tabletDetailMiddleware.colorImages.checkImagesExistence,
        tabletDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of tablet detail --- products/tablets/:tabletId/:tabletDetailId/highlightedImages
router.route('/:tabletId/details/:tabletDetailId/highlightedImages')
    .get(
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.highlightedImages.checkHlImagesExistence,
        tabletDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        tabletDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.highlightedImages.checkHlImagesExistence,
        tabletDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        tabletDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        tabletDetailMiddleware.checkIdExistence,
        tabletDetailMiddleware.checkDetailIdExistence,
        tabletDetailMiddleware.highlightedImages.checkHlImagesExistence,
        tabletDetailController.highlightedImages.deleteHighlightedImages
    )   
    


// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router