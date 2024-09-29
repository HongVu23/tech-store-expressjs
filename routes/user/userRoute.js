const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user/userController')
const userMiddleware = require('../../middlewares/user/userMiddleware')
const cartController = require('../../controllers/user/cartController')
const cartMiddleware = require('../../middlewares/user/cartMiddlware')
const favoriteProductController = require('../../controllers/user/favoriteProductController')
const favoriteProductMiddleware = require('../../middlewares/user/favoriteProductMiddleware')
const { savingErrorHandlerMiddleware } = require('../../middlewares/errorHandler/savingErrorHandler')
const verifyJWT = require('../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../middlewares/auth/verifyAdminRole')

// verify JWT
router.use(verifyJWT)

// routing for user --- /users
router.route('/')
    .get(
        verifyAdminRole,
        userController.getAllUsers
    )
    .post(
        verifyAdminRole,
        userMiddleware.checkRequiedFields,
        userController.createNewUser
    )



// routing for user searching --- /users/search
router.route('/search')
    .get(
        verifyAdminRole,
        userController.searchUser
    )


// routing for user --- /users/:userId
router.route('/:userId')
    .get(
        // verifyAdminRole,
        userMiddleware.checkIdExistence,
        userController.getUser
    )
    .patch(
        // verifyAdminRole,
        userMiddleware.checkIdExistence,
        userController.updateUser
    )
    .delete(
        verifyAdminRole,
        userMiddleware.checkIdExistence,
        userController.deleteUser
    )



// routing for user cart --- /users/:userId/cart
router.route('/:userId/cart')
    .get(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartController.getAllProducts
    )
    .post(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartMiddleware.checkRequiredFields,
        cartMiddleware.checkIdExsitenceInInvent,
        cartMiddleware.checkQuantity,
        cartController.createProduct
    )



// routing for user cart --- /users/:userId/cart/all
router.route('/:userId/cart/all')
    .delete(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartController.deleteAllProducts
    )



// routing for user cart statistics --- /users/:userId/cart/statistics
router.route('/:userId/cart/statistics')
    .get(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartController.getCartStatistics
    )    



// routing for user cart --- /users/:userId/cart/:productVariantId
router.route('/:userId/cart/:cartId')
    .patch(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartMiddleware.checkProductExistenceInCart,
        cartController.updateProduct
    )
    .delete(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        cartMiddleware.checkProductExistenceInCart,
        cartController.deleteProduct
    )



// routing for user favorite products --- /users/favoriteProducts
router.route('/:userId/favoriteProducts')
    .get(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        favoriteProductController.getAllFavoriteProducts
    )
    .post(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        favoriteProductMiddleware.checkRequiredFields,
        favoriteProductMiddleware.checkProductExistence,
        favoriteProductMiddleware.checkDuplicateProduct,
        favoriteProductController.createNewFavoriteProduct
    )

// routing for user favorite products --- /users/favoriteProducts/:favoriteProductId
router.route('/:userId/favoriteProducts/:favoriteProductId')
    .delete(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        favoriteProductMiddleware.checkProductExistenceInFP,
        favoriteProductController.deleteFavoriteProduct
    )



// routing for user avatar --- /users/:userId/avatar
router.route('/:userId/avatar')
    .patch(
        userMiddleware.checkForAvatar,
        userController.updateAvatar
    )
    .delete(
        userMiddleware.checkIdExistence,
        userMiddleware.checkValidUser,
        userController.deleteAvatar
    )



router.use(savingErrorHandlerMiddleware)



module.exports = router