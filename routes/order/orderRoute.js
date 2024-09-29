const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/order/orderController')
const orderMiddleware = require('../../middlewares/order/orderMiddleware')
const { savingErrorHandlerMiddleware } = require('../../middlewares/errorHandler/savingErrorHandler')
const verifyJWT = require('../../middlewares/auth/verifyJWT')
const verifyAdminRole = require('../../middlewares/auth/verifyAdminRole')

// verify JWT
router.use(verifyJWT)

// routing for order --- /orders
router.route('/')
    .get(
        orderController.getAllOrders
    )
    .post(
        orderMiddleware.checkRequiredFields,
        orderMiddleware.checkValidOrderItems,
        orderController.createNewOrder
    )



// routing for order statistics --- /orders/statistics
router.route('/statistics')
    .get(
        verifyAdminRole,
        orderController.getStatistics
    )



// routing for order statistics(day) --- /orders/statistics/chart
router.route('/statistics/chart')
    .get(
        verifyAdminRole,
        orderController.getStatisticChart
    )



// routing for order --- /orders/:orderId
router.route('/:orderId')
    .get(
        // verifyAdminRole,
        orderMiddleware.checkIdExistence,
        orderController.getOrder
    )



router.use(savingErrorHandlerMiddleware)

module.exports = router