const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const smartWatchController = require('../../../controllers/product/mainProduct/devices/smartWatch/controllers/smartWatch')
const smartWatchMiddleware = require('../../../middlewares/product/mainProduct/devices/smartWatch/middlewares/smartWatch')
const smartWatchVariantController = require('../../../controllers/product/mainProduct/devices/smartWatch/controllers/smartWatchVariant')
const smartWatchVariantMiddleware = require('../../../middlewares/product/mainProduct/devices/smartWatch/middlewares/smartWatchVariant')
const smartWatchDetailController = require('../../../controllers/product/mainProduct/devices/smartWatch/controllers/smartWatchDetail')
const smartWatchDetailMiddleware = require('../../../middlewares/product/mainProduct/devices/smartWatch/middlewares/smartWatchDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for smart watch --- products/smartWatchs
router.route('/')
    .get(
        smartWatchController.getAllSmartWatchs
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartWatchMiddleware.createNewSmartWatch.checkRequiredFieldsCNSW,
        smartWatchMiddleware.createNewSmartWatch.checkDuplicateSmartWatch,
        smartWatchController.createNewSmartWatch
    )

// routing for smart watch --- products/smartWatch/:smartWatchId
router.route('/:smartWatchId')
    .get(
        smartWatchMiddleware.checkIdExistence,
        smartWatchController.getSmartWatch
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartWatchMiddleware.updateSmartWatch.checkRequiredFieldsUSW,
        smartWatchMiddleware.checkIdExistence,
        smartWatchController.updateSmartWatch
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartWatchMiddleware.checkIdExistence,
        smartWatchMiddleware.deleteSmartWatch.checkVariants,
        smartWatchController.deleteSmartWatch
    )
    


// routing for full smart watch informations --- products/smartWatches/:smartWatchId/fullInfos
router.route('/:smartWatchId/fullInfos')
    .get(
        smartWatchMiddleware.checkIdExistence,
        smartWatchController.getFullSmartWatchInfos
    )



// routing for smart watch variant --- products/smartWatchs/:smartWatchId/variants
router.route('/:smartWatchId/variants')
    .get(
        smartWatchVariantMiddleware.checkIdExistence,
        smartWatchVariantController.getAllSmartWatchVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartWatchVariantMiddleware.createNewSmartWatchVariant.checkForCNSWV,
        smartWatchVariantMiddleware.checkIdExistence,
        smartWatchVariantMiddleware.createNewSmartWatchVariant.checkRequiredFieldsCNSWV,
        smartWatchVariantMiddleware.createNewSmartWatchVariant.checkDuplicateCNSWV,
        smartWatchVariantMiddleware.createNewSmartWatchVariant.checkDuplicateColor,
        smartWatchVariantController.createNewSmartWatchVariant
    )

// routing for smart watch variant --- products/smartWatchs/:smartWatchId/variants/:smartWatchVariantId
router.route('/:smartWatchId/variants/:smartWatchVariantId')
    .get(
        smartWatchVariantMiddleware.checkIdExistence,
        smartWatchVariantMiddleware.checkVariantIdExistence,
        smartWatchVariantController.getSmartWatchVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartWatchVariantMiddleware.updateSmartWatchVariant.checkForUSWV,
        smartWatchVariantMiddleware.checkIdExistence,
        smartWatchVariantMiddleware.checkVariantIdExistence,
        smartWatchVariantMiddleware.updateSmartWatchVariant.checkRequiredFieldsUSWV,
        smartWatchVariantController.updateSmartWatchVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartWatchVariantMiddleware.checkIdExistence,
        smartWatchVariantMiddleware.checkVariantIdExistence,
        smartWatchVariantMiddleware.deleteSmartWatchVariant.checkState,
        smartWatchVariantController.deleteSmartWatchVariant
    )



// routing for smart watch detail --- products/smartWatchs/:smartWatchId/details
router.route('/:smartWatchId/details')
    .get(
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailController.getSmartWatchDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.createNewSmartWatchDetail.checkRequiredFieldsCNSWD,
        smartWatchDetailMiddleware.createNewSmartWatchDetail.checkDuplicateSmartWatchDetail,
        smartWatchDetailController.createNewSmartWatchDetail
    )

// routing for smart watch detail --- products/smartWatchs/:smartWatchId/details/:smartWatchDetailId
router.route('/:smartWatchId/details/:smartWatchDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.updateSmartWatchDetail.checkRequiredFieldsUSWD,
        smartWatchDetailController.updateSmartWatchDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailController.deleteSmartWatchDetail
    )

// routing for color images of smartWatch detail --- products/smartWatchs/:smartWatchId/:smartWatchDetailId/colorImages
router.route('/:smartWatchId/details/:smartWatchDetailId/colorImages')
    .get(
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.colorImages.checkRequiredColor,
        smartWatchDetailMiddleware.colorImages.checkColorExistence,
        smartWatchDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        smartWatchDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.colorImages.checkRequiredColor,
        smartWatchDetailMiddleware.colorImages.checkColorExistence,
        smartWatchDetailMiddleware.colorImages.checkImagesExistence,
        smartWatchDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        smartWatchDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.colorImages.checkRequiredColor,
        smartWatchDetailMiddleware.colorImages.checkColorExistence,
        smartWatchDetailMiddleware.colorImages.checkImagesExistence,
        smartWatchDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of smartWatch detail --- products/smartWatchs/:smartWatchId/:smartWatchDetailId/highlightedImages
router.route('/:smartWatchId/details/:smartWatchDetailId/highlightedImages')
    .get(
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartWatchDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        smartWatchDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartWatchDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        smartWatchDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartWatchDetailMiddleware.checkIdExistence,
        smartWatchDetailMiddleware.checkDetailIdExistence,
        smartWatchDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartWatchDetailController.highlightedImages.deleteHighlightedImages
    )




// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router