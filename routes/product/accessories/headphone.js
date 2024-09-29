const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const headphoneController = require('../../../controllers/product/accessory/devices/headphone/controllers/headphone')
const headphoneMiddleware = require('../../../middlewares/product/accessory/devices/headphone/middlewares/headphone')
const headphoneVariantController = require('../../../controllers/product/accessory/devices/headphone/controllers/headphoneVariant')
const headphoneVariantMiddleware = require('../../../middlewares/product/accessory/devices/headphone/middlewares/headphoneVariant')
const headphoneDetailController = require('../../../controllers/product/accessory/devices/headphone/controllers/headphoneDetail')
const headphoneDetailMiddleware = require('../../../middlewares/product/accessory/devices/headphone/middlewares/headphoneDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for headphone --- products/headphones
router.route('/')
    .get(
        headphoneController.getAllHeadphones
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        headphoneMiddleware.createNewHeadphone.checkRequiredFieldsCNH,
        headphoneMiddleware.createNewHeadphone.checkDuplicateHeadphone,
        headphoneController.createNewHeadphone
    )

// routing for headphone --- products/headphone/:headphoneId
router.route('/:headphoneId')
    .get(
        headphoneMiddleware.checkIdExistence,
        headphoneController.getHeadphone
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        headphoneMiddleware.updateHeadphone.checkRequiredFieldsUH,
        headphoneMiddleware.checkIdExistence,
        headphoneController.updateHeadphone
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        headphoneMiddleware.checkIdExistence,
        headphoneMiddleware.deleteHeadphone.checkVariants,
        headphoneController.deleteHeadphone
    )



// routing for full headphone informations --- products/headphones/:headphoneId/fullInfos
router.route('/:headphoneId/fullInfos')
    .get(
        headphoneMiddleware.checkIdExistence,
        headphoneController.getFullHeadphoneInfos
    )



// routing for headphone variant --- products/headphones/:headphoneId/variants
router.route('/:headphoneId/variants')
    .get(
        headphoneVariantMiddleware.checkIdExistence,
        headphoneVariantController.getAllHeadphoneVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        headphoneVariantMiddleware.createNewHeadphoneVariant.checkForCNHV,
        headphoneVariantMiddleware.checkIdExistence,
        headphoneVariantMiddleware.createNewHeadphoneVariant.checkRequiredFieldsCNHV,
        headphoneVariantMiddleware.createNewHeadphoneVariant.checkDuplicateCNHV,
        headphoneVariantMiddleware.createNewHeadphoneVariant.checkDuplicateColor,
        headphoneVariantController.createNewHeadphoneVariant
    )

// routing for headphone variant --- products/headphones/:headphoneId/variants/:headphoneVariantId
router.route('/:headphoneId/variants/:headphoneVariantId')
    .get(
        headphoneVariantMiddleware.checkIdExistence,
        headphoneVariantMiddleware.checkVariantIdExistence,
        headphoneVariantController.getHeadphoneVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        headphoneVariantMiddleware.updateHeadphoneVariant.checkForUHV,
        headphoneVariantMiddleware.checkIdExistence,
        headphoneVariantMiddleware.checkVariantIdExistence,
        headphoneVariantMiddleware.updateHeadphoneVariant.checkRequiredFieldsUHV,
        headphoneVariantController.updateHeadphoneVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        headphoneVariantMiddleware.checkIdExistence,
        headphoneVariantMiddleware.checkVariantIdExistence,
        headphoneVariantMiddleware.deleteHeadphoneVariant.checkState,
        headphoneVariantController.deleteHeadphoneVariant
    )



// routing for headphone detail --- products/headphones/:headphoneId/details
router.route('/:headphoneId/details')
    .get(
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailController.getHeadphoneDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.createNewHeadphoneDetail.checkRequiredFieldsCNHD,
        headphoneDetailMiddleware.createNewHeadphoneDetail.checkDuplicateHeadphoneDetail,
        headphoneDetailController.createNewHeadphoneDetail
    )

// routing for headphone detail --- products/headphones/:headphoneId/details/:headphoneDetailId
router.route('/:headphoneId/details/:headphoneDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.updateHeadphoneDetail.checkRequiredFieldsUHD,
        headphoneDetailController.updateHeadphoneDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailController.deleteHeadphoneDetail
    )

// routing for color images of headphone detail --- products/headphones/:headphoneId/:headphoneDetailId/colorImages
router.route('/:headphoneId/details/:headphoneDetailId/colorImages')
    .get(
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.colorImages.checkRequiredColor,
        headphoneDetailMiddleware.colorImages.checkColorExistence,
        headphoneDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        headphoneDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.colorImages.checkRequiredColor,
        headphoneDetailMiddleware.colorImages.checkColorExistence,
        headphoneDetailMiddleware.colorImages.checkImagesExistence,
        headphoneDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        headphoneDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.colorImages.checkRequiredColor,
        headphoneDetailMiddleware.colorImages.checkColorExistence,
        headphoneDetailMiddleware.colorImages.checkImagesExistence,
        headphoneDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of headphone detail --- products/headphones/:headphoneId/:headphoneDetailId/highlightedImages
router.route('/:headphoneId/details/:headphoneDetailId/highlightedImages')
    .get(
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        headphoneDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        headphoneDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        headphoneDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        headphoneDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        headphoneDetailMiddleware.checkIdExistence,
        headphoneDetailMiddleware.checkDetailIdExistence,
        headphoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        headphoneDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router