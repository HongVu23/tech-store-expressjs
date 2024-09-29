const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const laptopController = require('../../../controllers/product/mainProduct/devices/laptop/controllers/laptop')
const laptopMiddleware = require('../../../middlewares/product/mainProduct/devices/laptop/middlewares/laptop')
const laptopVariantController = require('../../../controllers/product/mainProduct/devices/laptop/controllers/laptopVariant')
const laptopVariantMiddleware = require('../../../middlewares/product/mainProduct/devices/laptop/middlewares/laptopVariant')
const laptopDetailController = require('../../../controllers/product/mainProduct/devices/laptop/controllers/laptopDetail')
const laptopDetailMiddleware = require('../../../middlewares/product/mainProduct/devices/laptop/middlewares/laptopDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for laptop --- products/laptops
router.route('/')
    .get(
        laptopController.getAllLaptops
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        laptopMiddleware.createNewLaptop.checkRequiredFieldsCNL,
        laptopMiddleware.createNewLaptop.checkDuplicateLaptop,
        laptopController.createNewLaptop
    )

// routing for laptop --- products/laptop/:laptopId
router.route('/:laptopId')
    .get(
        laptopMiddleware.checkIdExistence,
        laptopController.getLaptop
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        laptopMiddleware.updateLaptop.checkRequiredFieldsUL,
        laptopMiddleware.checkIdExistence,
        laptopController.updateLaptop
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        laptopMiddleware.checkIdExistence,
        laptopMiddleware.deleteLaptop.checkVariants,
        laptopController.deleteLaptop
    )



// routing for full laptop informations --- products/laptops/:laptopId/fullInfos
router.route('/:laptopId/fullInfos')
    .get(
        laptopMiddleware.checkIdExistence,
        laptopController.getFullLaptopInfos
    )



// routing for laptop variant --- products/laptops/:laptopId/variants
router.route('/:laptopId/variants')
    .get(
        laptopVariantMiddleware.checkIdExistence,
        laptopVariantController.getAllLaptopVariants
    )
    .post(
        // verifyJWT,
        // verifyAdminRole,
        laptopVariantMiddleware.createNewLaptopVariant.checkForCNLV,
        laptopVariantMiddleware.checkIdExistence,
        laptopVariantMiddleware.createNewLaptopVariant.checkRequiredFieldsCNLV,
        laptopVariantMiddleware.createNewLaptopVariant.checkDuplicateCNLV,
        laptopVariantMiddleware.createNewLaptopVariant.checkDuplicateColor,
        laptopVariantController.createNewLaptopVariant
    )

// routing for laptop variant --- products/laptops/:laptopId/variants/:laptopVariantId
router.route('/:laptopId/variants/:laptopVariantId')
    .get(
        laptopVariantMiddleware.checkIdExistence,
        laptopVariantMiddleware.checkVariantIdExistence,
        laptopVariantController.getLaptopVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        laptopVariantMiddleware.updateLaptopVariant.checkForULV,
        laptopVariantMiddleware.checkIdExistence,
        laptopVariantMiddleware.checkVariantIdExistence,
        laptopVariantMiddleware.updateLaptopVariant.checkRequiredFieldsULV,
        laptopVariantController.updateLaptopVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        laptopVariantMiddleware.checkIdExistence,
        laptopVariantMiddleware.checkVariantIdExistence,
        laptopVariantMiddleware.deleteLaptopVariant.checkState,
        laptopVariantController.deleteLaptopVariant
    )



// routing for laptop detail --- products/laptops/:laptopId/details
router.route('/:laptopId/details')
    .get(
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailController.getLaptopDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.createNewLaptopDetail.checkRequiredFieldsCNLD,
        laptopDetailMiddleware.createNewLaptopDetail.checkDuplicateLaptopDetail,
        laptopDetailController.createNewLaptopDetail
    )

// routing for laptop detail --- products/laptops/:laptopId/details/:laptopDetailId
router.route('/:laptopId/details/:laptopDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.updateLaptopDetail.checkRequiredFieldsULD,
        laptopDetailController.updateLaptopDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailController.deleteLaptopDetail
    )

// routing for color images of laptop detail --- products/laptops/:laptopId/:laptopDetailId/colorImages
router.route('/:laptopId/details/:laptopDetailId/colorImages')
    .get(
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.colorImages.checkRequiredColor,
        laptopDetailMiddleware.colorImages.checkColorExistence,
        laptopDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        laptopDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.colorImages.checkRequiredColor,
        laptopDetailMiddleware.colorImages.checkColorExistence,
        laptopDetailMiddleware.colorImages.checkImagesExistence,
        laptopDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        laptopDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.colorImages.checkRequiredColor,
        laptopDetailMiddleware.colorImages.checkColorExistence,
        laptopDetailMiddleware.colorImages.checkImagesExistence,
        laptopDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of laptop detail --- products/laptops/:laptopId/:laptopDetailId/highlightedImages
router.route('/:laptopId/details/:laptopDetailId/highlightedImages')
    .get(
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.highlightedImages.checkHlImagesExistence,
        laptopDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        laptopDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.highlightedImages.checkHlImagesExistence,
        laptopDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        laptopDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        laptopDetailMiddleware.checkIdExistence,
        laptopDetailMiddleware.checkDetailIdExistence,
        laptopDetailMiddleware.highlightedImages.checkHlImagesExistence,
        laptopDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router