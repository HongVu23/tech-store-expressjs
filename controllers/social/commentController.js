const asyncHandler = require('express-async-handler')
const Comment = require('../../models/social/Comment')
const productTypes = require('../../configs/productTypes')

// get comments by product id
const getComments = asyncHandler(async (req, res) => {

    const { productId } = req.query

    const comments = await Comment.find({ product: productId, isReplyComment: false }).populate({ path: 'user', select: '-password' }).lean().exec()

    if (!comments.length) {
        // return res.status(404).json({ message: 'Comment not found' })
        return res.json([])
    }

    return res.json(comments)
})

// create new comment
const createNewComment = asyncHandler(async (req, res) => {

    const { content, productId, productType } = req.body
    const user = req.user

    const newComment = {
        content,
        user: user.id,
        product: productId,
        productType
    }

    await Comment.create(newComment)

    return res.status(201).json({ message: 'Comment is created' })
})

// update comment
const updateComment = asyncHandler(async (req, res) => {

    const { content, comment } = req.body

    if (!content) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    comment.content = content

    await comment.save()

    return res.json({ message: 'Comment is updated' })
})

// delete comment
const deleteComment = asyncHandler(async (req, res) => {

    const { comment } = req.body

    const replyComments = comment.replyComments

    await comment.deleteOne()

    // delete reply comment if exist
    if (replyComments.length) {
        await Comment.deleteMany({ _id: { $in: replyComments } })
    }

    return res.json({ message: 'Comment is deleted' })
})

// reply comment
const getReplyComments = asyncHandler(async (req, res) => {

    const { comment } = req.body

    if (!comment.replyComments) {
        return res.status(404).json({ message: 'No reply comments found' })
    }

    const replyComments = await Comment.findOne({ _id: comment._id }).populate({
        path: 'replyComments',
        populate: {
            path: 'user',
            model: 'User',
            select: 'username email'
        }
    }).lean().exec()

    return res.json(replyComments.replyComments)
})

// create reply comment
const createReplyComment = asyncHandler(async (req, res) => {

    const { comment, content } = req.body

    if (!content) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const replyComment = await Comment.create({
        content,
        user: comment.user,
        product: comment.product,
        productType: comment.productType,
        isReplyComment: true
    })

    comment.replyComments = [...comment.replyComments, replyComment._id]

    await comment.save()

    return res.status(201).json({ message: 'Reply comment is created' })
})

module.exports = {
    getComments,
    createNewComment,
    updateComment,
    deleteComment,
    getReplyComments,
    createReplyComment
}