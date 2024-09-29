const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth/authController')
const loginLimiter = require('../../middlewares/auth/LoginLimiter')
const commentMiddleware = require('../../middlewares/social/commentMiddleware')

router.route('/')
    .post(/*loginLimiter*/ authController.login)

router.route('/register')
    .post(authController.register)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/changePassword')
    .patch(authController.changePassword)

module.exports = router