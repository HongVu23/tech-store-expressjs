const express = require('express')
const router = express.Router()
const { savingErrorHandlerMiddleware } = require('../../../middlewares/errorHandler/savingErrorHandler')
const keyboardController = require('../../../controllers/product/accessory/devices/keyboard/controllers/keyboard')
const keyboardMiddleware = require('../../../middlewares/product/accessory/devices/keyboard/middlewares/keyboard')
const keyboardVariantController = require('../../../controllers/product/accessory/devices/keyboard/controllers/keyboardVariant')
const keyboardVariantMiddleware = require('../../../middlewares/product/accessory/devices/keyboard/middlewares/keyboardVariant')
const keyboardDetailController = require('../../../controllers/product/accessory/devices/keyboard/controllers/keyboardDetail')
const keyboardDetailMiddleware = require('../../../middlewares/product/accessory/devices/keyboard/middlewares/keyboardDetail')
const verifyJWT = require('../../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../../middlewares/auth/verifyAdminRole')

// routing for keyboard --- products/keyboards
router.route('/')
    .get(
        keyboardController.getAllKeyboards
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        keyboardMiddleware.createNewKeyboard.checkRequiredFieldsCNK,
        keyboardMiddleware.createNewKeyboard.checkDuplicateKeyboard,
        keyboardController.createNewKeyboard
    )

// routing for keyboard --- products/keyboard/:keyboardId
router.route('/:keyboardId')
    .get(
        keyboardMiddleware.checkIdExistence,
        keyboardController.getKeyboard
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        keyboardMiddleware.updateKeyboard.checkRequiredFieldsUK,
        keyboardMiddleware.checkIdExistence,
        keyboardController.updateKeyboard
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        keyboardMiddleware.checkIdExistence,
        keyboardMiddleware.deleteKeyboard.checkVariants,
        keyboardController.deleteKeyboard
    )



// routing for full keyboard informations --- products/keyboards/:keyboardId/fullInfos
router.route('/:keyboardId/fullInfos')
    .get(
        keyboardMiddleware.checkIdExistence,
        keyboardController.getFullKeyboardInfos
    )    



// routing for keyboard variant --- products/keyboards/:keyboardId/variants
router.route('/:keyboardId/variants')
    .get(
        keyboardVariantMiddleware.checkIdExistence,
        keyboardVariantController.getAllKeyboardVariants
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        keyboardVariantMiddleware.createNewKeyboardVariant.checkForCNKV,
        keyboardVariantMiddleware.checkIdExistence,
        keyboardVariantMiddleware.createNewKeyboardVariant.checkRequiredFieldsCNKV,
        keyboardVariantMiddleware.createNewKeyboardVariant.checkDuplicateCNKV,
        keyboardVariantMiddleware.createNewKeyboardVariant.checkDuplicateColor,
        keyboardVariantController.createNewKeyboardVariant
    )

// routing for keyboard variant --- products/keyboards/:keyboardId/variants/:keyboardVariantId
router.route('/:keyboardId/variants/:keyboardVariantId')
    .get(
        keyboardVariantMiddleware.checkIdExistence,
        keyboardVariantMiddleware.checkVariantIdExistence,
        keyboardVariantController.getKeyboardVariant
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        keyboardVariantMiddleware.updateKeyboardVariant.checkForUKV,
        keyboardVariantMiddleware.checkIdExistence,
        keyboardVariantMiddleware.checkVariantIdExistence,
        keyboardVariantMiddleware.updateKeyboardVariant.checkRequiredFieldsUKV,
        keyboardVariantController.updateKeyboardVariant
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        keyboardVariantMiddleware.checkIdExistence,
        keyboardVariantMiddleware.checkVariantIdExistence,
        keyboardVariantMiddleware.deleteKeyboardVariant.checkState,
        keyboardVariantController.deleteKeyboardVariant
    )



// routing for keyboard detail --- products/keyboards/:keyboardId/details
router.route('/:keyboardId/details')
    .get(
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailController.getKeyboardDetail
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.createNewKeyboardDetail.checkRequiredFieldsCNKD,
        keyboardDetailMiddleware.createNewKeyboardDetail.checkDuplicateKeyboardDetail,
        keyboardDetailController.createNewKeyboardDetail
    )

// routing for keyboard detail --- products/keyboards/:keyboardId/details/:keyboardDetailId
router.route('/:keyboardId/details/:keyboardDetailId')
    .patch(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.updateKeyboardDetail.checkRequiredFieldsUKD,
        keyboardDetailController.updateKeyboardDetail
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailController.deleteKeyboardDetail
    )

// routing for color images of keyboard detail --- products/keyboards/:keyboardId/:keyboardDetailId/colorImages
router.route('/:keyboardId/details/:keyboardDetailId/colorImages')
    .get(
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.colorImages.checkRequiredColor,
        keyboardDetailMiddleware.colorImages.checkColorExistence,
        keyboardDetailController.colorImages.getColorImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.colorImages.createNewColorImages.checkForCNCI,
        keyboardDetailController.colorImages.createNewColorImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.colorImages.updateColorImages.checkForUCI,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.colorImages.checkRequiredColor,
        keyboardDetailMiddleware.colorImages.checkColorExistence,
        keyboardDetailMiddleware.colorImages.checkImagesExistence,
        keyboardDetailMiddleware.colorImages.updateColorImages.checkValidImages,
        keyboardDetailController.colorImages.updateColorImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.colorImages.checkRequiredColor,
        keyboardDetailMiddleware.colorImages.checkColorExistence,
        keyboardDetailMiddleware.colorImages.checkImagesExistence,
        keyboardDetailController.colorImages.deleteColorImages
    )

// routing for highlighted images of keyboard detail --- products/keyboards/:keyboardId/:keyboardDetailId/highlightedImages
router.route('/:keyboardId/details/:keyboardDetailId/highlightedImages')
    .get(
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.highlightedImages.checkHlImagesExistence,
        keyboardDetailController.highlightedImages.getHighlightedImages
    )
    .post(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.highlightedImages.createNewHighlightedImages.checkForCNHI,
        keyboardDetailController.highlightedImages.createNewHighlightedImages
    )
    .patch(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.highlightedImages.updateHighlightedImages.checkForUHI,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.highlightedImages.checkHlImagesExistence,
        keyboardDetailMiddleware.highlightedImages.updateHighlightedImages.checkValidHlImages,
        keyboardDetailController.highlightedImages.updateHighlightedImages
    )
    .delete(
        verifyJWT,
        verifyAdminRole,
        keyboardDetailMiddleware.checkIdExistence,
        keyboardDetailMiddleware.checkDetailIdExistence,
        keyboardDetailMiddleware.highlightedImages.checkHlImagesExistence,
        keyboardDetailController.highlightedImages.deleteHighlightedImages
    )



// saving error handler --- for validation error
router.use(savingErrorHandlerMiddleware)



module.exports = router