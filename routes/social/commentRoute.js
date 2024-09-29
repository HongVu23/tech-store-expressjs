const express = require('express')
const router = express.Router()
const commentController = require('../../controllers/social/commentController')
const commentMiddleware = require('../../middlewares/social/commentMiddleware')
const { savingErrorHandlerMiddleware } = require('../../middlewares/errorHandler/savingErrorHandler')
const verifyJWT = require('../../middlewares/auth/verifyJWT')

// routing for comment --- /comments
router.route('/')
    .get(
        commentMiddleware.checkIdExistenceForQuery,
        commentController.getComments
    )
    .post(
        verifyJWT,
        commentMiddleware.checkRequiredFields,
        commentMiddleware.checkIdExistence,
        commentController.createNewComment
    )

// routing for comment --- /comments/:commentId
router.route('/:commentId')
    .patch(
        verifyJWT,
        commentMiddleware.checkCommentIdExistence,
        commentController.updateComment
    )
    .delete(
        verifyJWT,
        commentMiddleware.checkCommentIdExistence,
        commentController.deleteComment
    )



// routing for reply comment --- /comments/:commentId/replyComments
router.route('/:commentId/replyComments')
    .get(
        commentMiddleware.checkCommentIdExistence,
        commentController.getReplyComments
    )
    .post(
        commentMiddleware.checkCommentIdExistence,
        commentController.createReplyComment
    )



router.use(savingErrorHandlerMiddleware)



module.exports = router