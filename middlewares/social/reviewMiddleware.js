const mongoose = require('mongoose')
const multer = require('multer')
const asyncHandler = require('express-async-handler')
const Review = require('../../models/social/Review')
const User = require('../../models/user/User')
const productTypes = require('../../configs/productTypes')
const { fileFilterCreator } = require('../../helpers/social/review/fileFilterCreator')
const { storageCreator } = require('../../helpers/social/review/storageCreator')
const { fileSizeLimiterCreator } = require('../../helpers/uploadFile/fileSizeLimiterCreator')
const { configUploadMultiple } = require('../../helpers/uploadFile/configUpload')

// configure for upload image and validate data for create new review
const setUpload = (actionType) => {

    const storage = storageCreator()

    const fileFilter = fileFilterCreator(actionType)

    const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

    return configUploadMultiple(storage, fileFilter, fileSizeLimiter, 'images', 5)
}

const uploadForCNR = setUpload('create')

// upload file and validation for create new review
const checkForCNR = (req, res, next) => {

    uploadForCNR(req, res, (err) => {

        if (err instanceof multer.MulterError) {
            // error related to multer error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
            } else {
                return res.status(500).json({ message: err + '. Upload failed due to multer error' })
            }
        } else if (err) {
            if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                return res.status(403).json({ message: err.message })
            } else if (err.message === 'All fields are required') {
                return res.status(400).json({ message: err.message })
            } else if (err.message === 'Product not found') {
                return res.status(404).json({ message: err.message })
            } else {
                return next(err)
            }
        }
        next()
    })
}

// check all required fields --- for create new review
const checkRequiredFieldsForCNR = (req, res, next) => {

    const { content, productId, ratingStar } = req.body

    if (!content || !productId || !ratingStar) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check all required fields --- for update review
const checkRequiredFieldsForUR = (req, res, next) => {

    const { content, ratingStar } = req.body

    if (!content || !ratingStar) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check whether product id is exist or not
const checkIdExistence = asyncHandler(async (req, res, next) => {

    let { productId } = req.body

    if (req.body?.review) {
        productId = req.body.review.product
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: 'Product not found' })
    }

    let isExist = false
    let productInfo

    for (const productType of productTypes) {
        
        const product = await productType.model.findOne({ _id: productId }).lean().exec()

        if (product) {
            isExist = true
            productInfo = { name: product.name, productType: productType.name }
            break
        }
    }

    if (!isExist) {
        return res.status(404).json({ message: 'Product not found' })
    }

    // asign product info to req.body
    req.body.productInfo = productInfo

    return next()
})

// check wether review is exist or not
const checkReviewIdExistence = asyncHandler(async (req, res, next) => {

    const { reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(404).json({ message: 'Review not found' })
    }

    let review

    try {
        review = await Review.findOne({ _id: reviewId }).exec()
    } catch (err) {
        return next(err)
    }

    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }

    // asign review to req.body
    req.body.review = review

    return next()
})

// check whether updated images is valid or not
const checkValidImages = (req, res, next) => {

    // check whether updated images is valid or if it is sent
    let { updatedImages, review } = req.body

    if (updatedImages) {
    
        try {
            updatedImages = JSON.parse(updatedImages)
        } catch (err) {
            return cb(new Error(err.message))
        }

        for (const image of updatedImages) {

            let isValid = false
            
            for (const reviewImage of review.images) {

                if (reviewImage.imageName === image.imageName && reviewImage.imageUrl === image.imageUrl) {
                    isValid = true
                    break
                }
            }

            if (!isValid) {
                return res.status(400).json({ message: 'Invalid image are found' })
            }
        }

        // 'Invalid number of image are found'
        for (let i = 0; i < updatedImages.length - 1; i++) {

            for (let j = i + 1; j < updatedImages.length; j++) {
                if (updatedImages[i].imageName === updatedImages[j].imageName && updatedImages[i].imageUrl === updatedImages[j].imageUrl) {
                    return res.status(400).json({ message: 'Invalid number of image are found' })
                }
            }
        }
    }

    return next()
}

const uploadForUR = setUpload('update')

// upload file and validation for create new review
const checkForUR = (req, res, next) => {

    uploadForUR(req, res, (err) => {

        if (err instanceof multer.MulterError) {
            // error related to multer error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
            } else {
                return res.status(500).json({ message: err + '. Upload failed due to multer error' })
            }
        } else if (err) {
            if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                return res.status(403).json({ message: err.message })
            } else if (err.message === 'All fields are required') {
                return res.status(400).json({ message: err.message })
            } else if (err.message === 'Review not found') {
                return res.status(404).json({ message: err.message })
            } else if (err.message === 'Invalid image are found') {
                return res.status(400).json({ message: err.message })
            } else if (err.message === 'Invalid number of image are found') {
                return res.status(400).json({ message: err.message })
            } else {
                return next(err)
            }
        }
        next()
    })
}

// check whether like of user is exist or not
const checkUserLikeExistence = (req, res, next) => {

    const { review } = req.body
    const user = req.user

    const userLike = review.likes.includes(user.id)

    if (!userLike) {
        return res.status(404).json({ message: 'User not found in like list' })
    }

    return next()
}

// check whether dislike of user is exist or not
const checkUserDislikeExistence = (req, res, next) => {

    const { review } = req.body
    const user = req.user

    const userDislike = review.dislikes.includes(user.id)

    if (!userDislike) {
        return res.status(404).json({ message: 'User id not found in dislike list' })
    }

    return next()
}

// check whether query product id is exist or not
const checkQueryIdExistence = asyncHandler(async (req, res, next) => {

    let { productId } = req.query
    
    if (!productId) {
        return res.status(400).json({ message: 'Product id is required' })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: 'Product not found' })
    }

    let isExist = false
    let productInfo

    for (const productType of productTypes) {
        
        const product = await productType.model.findOne({ _id: productId }).lean().exec()

        if (product) {
            isExist = true
            productInfo = { name: product.name, productType: productType.name }
            break
        }
    }

    if (!isExist) {
        return res.status(404).json({ message: 'Product not found' })
    }

    // asign product info to req.body
    req.body.productInfo = productInfo

    return next()
})


module.exports = {
    checkForCNR,
    checkRequiredFieldsForCNR,
    checkIdExistence,
    checkForUR,
    checkRequiredFieldsForUR,
    checkReviewIdExistence,
    checkValidImages,
    checkUserLikeExistence,
    checkUserDislikeExistence,
    checkQueryIdExistence
}