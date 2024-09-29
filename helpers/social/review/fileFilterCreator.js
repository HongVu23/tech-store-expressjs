const mongoose = require('mongoose')
const productTypes = require('../../../configs/productTypes')
const User = require('../../../models/user/User')
const Review = require('../../../models/social/Review')
const { checkFileExt } = require('../../uploadFile/checkFileExt')

// check all required fields
const checkRequiredFields = (fields, actionType) => {

    const { content, productId, ratingStar } = fields

    if (actionType === 'create') {

        if (!content || !productId || !ratingStar) {
            return { isValid: false, error: { message: 'All fields are required' } }
        }
    } else {

        if (!content || !ratingStar) {
            return { isValid: false, error: { message: 'All fields are required' } }
        }
    }

    return { isValid: true }
}

// check whether product id is exist or not
const checkIdExistence = async (productId) => {

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return { isValid: false, error: { message: 'Product not found' } }
    }

    let isExist = false
    let productInfo

    for (const productType of productTypes) {

        let product

        try {
            product = await productType.model.findOne({ _id: productId }).lean().exec()
        } catch (err) {
            return { isValid: false, error: { message: err.message } }
        }

        if (product) {
            isExist = true
            productInfo = { name: product.name, productType: productType.name }
            break
        }
    }

    if (!isExist) {
        return { isValid: false, error: { message: 'Product not found' } }
    }

    console.log({productInfo})

    return { isValid: true, data: productInfo }
}

// check whether review id is exist or not
const checkReviewIdExistence = async (reviewId) => {

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return { isValid: false, error: { message: 'Review not found' } }
    }

    let review

    try {
        review = await Review.findOne({ _id: reviewId }).exec()
    } catch (err) {
        return { isValid: false, error: { message: err.message } }
    }

    if (!review) {
        return { isValid: false, error: { message: 'Review not found' } }
    }

    return { isValid: true, data: review }
}

const fileFilterCreator = (actionType) => {

    const fileFilter = async (req, file, cb) => {

        let { content, productId, ratingStar } = req.body
        const { reviewId } = req.params

        const checkFileExtResult = checkFileExt(file.originalname)

        if (!checkFileExtResult.isValid) {
            return cb(new Error(checkFileExtResult.error.message))
        }

        const checkRequiredFieldsResult = checkRequiredFields({ content, productId, ratingStar }, actionType)

        if (!checkRequiredFieldsResult.isValid) {
            return cb(new Error(checkRequiredFieldsResult.error.message))
        }

        if (actionType === 'update') {

            // check review
            const checkReviewIdExistenceResult = await checkReviewIdExistence(reviewId)

            if (!checkReviewIdExistenceResult.isValid) {
                return cb(new Error(checkReviewIdExistenceResult.error.message))
            }

            productId = checkReviewIdExistenceResult.data.product

            // review
            const review = checkReviewIdExistenceResult.data

            // asign review to req.body
            req.body.review = review

            // check whether updated images is valid or if it is sent
            let { updatedImages } = req.body

            if (actionType === 'update') {
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
                            return cb(new Error('Invalid image are found'))
                        }
                    }
    
                    // 'Invalid number of image are found'
                    for (let i = 0; i < updatedImages.length - 1; i++) {
    
                        for (let j = i + 1; j < updatedImages.length; j++) {
                            if (updatedImages[i].imageName === updatedImages[j].imageName && updatedImages[i].imageUrl === updatedImages[j].imageUrl) {
                                return cb(new Error('Invalid number of image are found'))
                            }
                        }
                    }
                }
                
            }

        }

        const checkIdExistenceResult = await checkIdExistence(productId)

        if (!checkIdExistenceResult.isValid) {
            return cb(new Error(checkIdExistenceResult.error.message))
        }

        // product info
        const productInfo = checkIdExistenceResult.data

        // asign product type to req.body
        req.body.productInfo = productInfo

        return cb(null, true)
    }

    return fileFilter
}

module.exports = {
    fileFilterCreator
}