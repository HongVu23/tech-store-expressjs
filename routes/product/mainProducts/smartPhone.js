const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const smartPhoneController = require('../../../controllers/product/mainProduct/devices/smartPhone/controllers/smartPhone')
const smartPhoneMiddleware = require('../../../middlewares/product/mainProduct/devices/smartPhone/middlewares/smartPhone')
const smartPhoneVariantController = require('../../../controllers/product/mainProduct/devices/smartPhone/controllers/smartPhoneVariant')
const smartPhoneVariantMiddleware = require('../../../middlewares/product/mainProduct/devices/smartPhone/middlewares/smartPhoneVariant')
const smartPhoneDetailController = require('../../../controllers/product/mainProduct/devices/smartPhone/controllers/smartPhoneDetail')
const smartPhoneDetailMiddleware = require('../../../middlewares/product/mainProduct/devices/smartPhone/middlewares/smartPhoneDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for smartPhone --- products/smartPhones
router.route('/')
    .get(
        smartPhoneController.getAllSmartPhones
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartPhoneMiddleware.createNewSmartPhone.checkRequiredFieldsCNSM,
        smartPhoneMiddleware.createNewSmartPhone.checkDuplicateSmartPhone,
        smartPhoneController.createNewSmartPhone
    )

// routing for smartPhone --- products/smartPhone/:smartPhoneId
router.route('/:smartPhoneId')
    .get(
        smartPhoneMiddleware.checkIdExistence,
        smartPhoneController.getSmartPhone
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartPhoneMiddleware.updateSmartPhone.checkRequiredFieldsUSM,
        smartPhoneMiddleware.checkIdExistence,
        smartPhoneController.updateSmartPhone
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartPhoneMiddleware.checkIdExistence,
        smartPhoneMiddleware.deleteSmartPhone.checkVariants,
        smartPhoneController.deleteSmartPhone
    )

    

// routing for full smart phone informations --- products/smartPhones/:smartPhoneId/fullInfos
router.route('/:smartPhoneId/fullInfos')
    .get(
        smartPhoneMiddleware.checkIdExistence,
        smartPhoneController.getFullSmartPhoneInfos
    )



// routing for smart phone variant --- products/smartPhones/:smartPhoneId/variants
router.route('/:smartPhoneId/variants')
    .get(
        smartPhoneVariantMiddleware.checkIdExistence,
        smartPhoneVariantController.getAllSmartPhoneVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartPhoneVariantMiddleware.createNewSmartPhoneVariant.checkForCNSMV,
        smartPhoneVariantMiddleware.checkIdExistence,
        smartPhoneVariantMiddleware.createNewSmartPhoneVariant.checkRequiredFieldsCNSMV,
        smartPhoneVariantMiddleware.createNewSmartPhoneVariant.checkDuplicateCNSMV,
        smartPhoneVariantMiddleware.createNewSmartPhoneVariant.checkDuplicateColor,
        smartPhoneVariantController.createNewSmartPhoneVariant
    )

// routing for smart phone variant --- products/smartPhones/:smartPhoneId/variants/:smartPhoneVariantId
router.route('/:smartPhoneId/variants/:smartPhoneVariantId')
    .get(
        smartPhoneVariantMiddleware.checkIdExistence,
        smartPhoneVariantMiddleware.checkVariantIdExistence,
        smartPhoneVariantController.getSmartPhoneVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartPhoneVariantMiddleware.updateSmartPhoneVariant.checkForUSMV,
        smartPhoneVariantMiddleware.checkIdExistence,
        smartPhoneVariantMiddleware.checkVariantIdExistence,
        smartPhoneVariantMiddleware.updateSmartPhoneVariant.checkRequiredFieldsUSMV,
        smartPhoneVariantController.updateSmartPhoneVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartPhoneVariantMiddleware.checkIdExistence,
        smartPhoneVariantMiddleware.checkVariantIdExistence,
        smartPhoneVariantMiddleware.deleteSmartPhoneVariant.checkState,
        smartPhoneVariantController.deleteSmartPhoneVariant
    )



// routing for smart phone detail --- products/smartPhones/:smartPhoneId/details
router.route('/:smartPhoneId/details')
    .get(
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailController.getSmartPhoneDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.createNewSmartPhoneDetail.checkRequiredFieldsCNSMD,
        smartPhoneDetailMiddleware.createNewSmartPhoneDetail.checkDuplicateSmartPhoneDetail,
        smartPhoneDetailController.createNewSmartPhoneDetail
    )

// routing for smart phone detail --- products/smartPhones/:smartPhoneId/details/:smartPhoneDetailId
router.route('/:smartPhoneId/details/:smartPhoneDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.updateSmartPhoneDetail.checkRequiredFieldsUSMD,
        smartPhoneDetailController.updateSmartPhoneDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailController.deleteSmartPhoneDetail
    )

// routing for color images of smartPhone detail --- products/smartPhones/:smartPhoneId/:smartPhoneDetailId/colorImages
router.route('/:smartPhoneId/details/:smartPhoneDetailId/colorImages')
    .get(
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.colorImages.checkRequiredColor,
        smartPhoneDetailMiddleware.colorImages.checkColorExistence,
        smartPhoneDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        smartPhoneDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.colorImages.checkRequiredColor,
        smartPhoneDetailMiddleware.colorImages.checkColorExistence,
        smartPhoneDetailMiddleware.colorImages.checkImagesExistence,
        smartPhoneDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        smartPhoneDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.colorImages.checkRequiredColor,
        smartPhoneDetailMiddleware.colorImages.checkColorExistence,
        smartPhoneDetailMiddleware.colorImages.checkImagesExistence,
        smartPhoneDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of smartPhone detail --- products/smartPhones/:smartPhoneId/:smartPhoneDetailId/highlightedImages
router.route('/:smartPhoneId/details/:smartPhoneDetailId/highlightedImages')
    .get(
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartPhoneDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        smartPhoneDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartPhoneDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        smartPhoneDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        smartPhoneDetailMiddleware.checkIdExistence,
        smartPhoneDetailMiddleware.checkDetailIdExistence,
        smartPhoneDetailMiddleware.highlightedImages.checkHlImagesExistence,
        smartPhoneDetailController.highlightedImages.deleteHighlightedImages
    )
    


// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router