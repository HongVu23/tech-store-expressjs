const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const productTypes = require('../../configs/productTypes')
const User = require('../../models/user/User')
const Comment = require('../../models/social/Comment')

// check all required fields (for create new comment) 
const checkRequiredFields = (req, res, next) => {

    const { content, productId } = req.body

    if (!content || !productId) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check whether product id is exist or not
const checkIdExistence = asyncHandler(async (req, res, next) => {

    const { productId } = req.body

    if (!productId) {
        return res.status(400).json({ message: 'Product id is required' })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: 'Product not found' })
    }

    let isExist = false

    for (const productType of productTypes) {
        
        const product = await productType.model.findOne({ _id: productId }).lean().exec()

        if (product) {
            isExist = true
            // asign productType to req.body
            req.body.productType = productType.name
            break
        }
    }

    if (!isExist) {
        return res.status(404).json({ message: 'Product not found' })
    }

    return next()
})

// check whether product id is exist or not (for query)
const checkIdExistenceForQuery = asyncHandler(async (req, res, next) => {

    const { productId } = req.query

    if (!productId) {
        return res.status(400).json({ message: 'Product id is required' })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: 'Product not found' })
    }

    let isExist = false

    for (const productType of productTypes) {
        
        const product = await productType.model.findOne({ _id: productId }).lean().exec()

        if (product) {
            isExist = true
            // asign productType to req.body
            req.body.productType = productType.name
            break
        }
    }

    if (!isExist) {
        return res.status(404).json({ message: 'Product not found' })
    }

    return next()
})

// check whether comment id is exist or not
const checkCommentIdExistence = asyncHandler(async (req, res, next) => {

    const { commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ message: 'Comment not found' })
    }

    const comment = await Comment.findOne({ _id: commentId }).exec()

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' })
    }

    // asign comment to req.bdoy
    req.body.comment = comment

    return next()
})

module.exports = {
    checkRequiredFields,
    checkIdExistence,
    checkIdExistenceForQuery,
    checkCommentIdExistence
}