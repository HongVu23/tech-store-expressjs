const express = require('express')
const router = express.Router()
const commentMiddleware = require('../../middlewares/social/commentMiddleware')
const reviewController = require('../../controllers/social/reviewController')
const reviewMiddleware = require('../../middlewares/social/reviewMiddleware')
const { savingErrorHandlerMiddleware } = require('../../middlewares/errorHandler/savingErrorHandler')
const verifyJWT = require('../../middlewares/auth/verifyJWT')

// routing for review --- /reviews
router.route('/')
    .get(
        commentMiddleware.checkIdExistenceForQuery,
        reviewController.getALlReviews
    )
    .post(
        verifyJWT,
        reviewMiddleware.checkForCNR,
        reviewMiddleware.checkRequiredFieldsForCNR,
        reviewMiddleware.checkIdExistence,
        reviewController.createNewReview
    )



// routing for rating star statistics --- /reviews/ratingStastistics
router.route('/ratingStatistics')
    .get(
        reviewMiddleware.checkQueryIdExistence,
        reviewController.getRatingStarStatistics
    )



// routing for review --- /reviews/:reviewId
router.route('/:reviewId')
    .patch(
        verifyJWT,
        reviewMiddleware.checkForUR,
        reviewMiddleware.checkRequiredFieldsForUR,
        reviewMiddleware.checkReviewIdExistence,
        reviewMiddleware.checkIdExistence,
        reviewMiddleware.checkValidImages,
        reviewController.updateReview
    )
    .delete(
        verifyJWT,
        reviewMiddleware.checkReviewIdExistence,
        reviewMiddleware.checkIdExistence,
        reviewController.deleteReview
    )



// routing for like review --- /reviews/:reviewId/likes
router.route('/:reviewId/likes')
    .get(
        reviewMiddleware.checkReviewIdExistence,
        reviewController.getLikedUsers
    )
    .post(
        verifyJWT,
        reviewMiddleware.checkReviewIdExistence,
        reviewController.createNewLike
    )
    .delete(
        verifyJWT,
        reviewMiddleware.checkReviewIdExistence,
        reviewMiddleware.checkUserLikeExistence,
        reviewController.deleteLike
    )



// routing for like review --- /reviews/:reviewId/dislikes
router.route('/:reviewId/dislikes')
    .get(
        reviewMiddleware.checkReviewIdExistence,
        reviewController.getDislikedUsers
    )
    .post(
        verifyJWT,
        reviewMiddleware.checkReviewIdExistence,
        reviewController.createNewDisLike
    )
    .delete(
        verifyJWT,
        reviewMiddleware.checkReviewIdExistence,
        reviewMiddleware.checkUserDislikeExistence,
        reviewController.deleteDislike
    )



router.use(savingErrorHandlerMiddleware)



module.exports = router