const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Review = require('../../models/social/Review')
const { convertToLowercase } = require('../../utils/standardizeStr')
const { standardizeFolderNames } = require('../../utils/standardizeNames')
const { getRatingStarStatisticsHelper } = require('../../helpers/social/review/ratingStatistics')

// get all reviews
const getALlReviews = asyncHandler(async (req, res) => {

    const { productId } = req.query

    const reviews = await Review.find({ product: productId }).populate({ path: 'user', select: '-password' }).lean().exec()

    if (!reviews.length) {
        // return res.status(404).json({ message: 'Reviews not found' })

        return res.json([])
    }

    return res.json(reviews)
})

// create new review
const createNewReview = asyncHandler(async (req, res, next) => {

    const { content, productId, ratingStar, productInfo } = req.body
    const user = req.user
    const images = req.files

    let imagesArray = []

    if (images) {

        imagesArray = images.map(image =>
        ({
            imageName: image.filename,
            imageUrl: `${process.env.SERVER_URL}/images/products/${convertToLowercase(productInfo.productType)}s/${standardizeFolderNames(productInfo.name)}/review-images/${image.filename}`
        })
        )
    }

    try {
        const newReview = {
            content,
            user: user.id,
            product: productId,
            productType: productInfo.productType,
            images: imagesArray,
            ratingStar
        }

        await Review.create(newReview)
    } catch (err) {
        // remember to remove if error occur

        if (images) {

            for (const file of req.files) {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path)
                }
            }
        }

        return next(err)
    }

    return res.status(201).json({ message: 'Review is created' })
})

// update review
const updateReview = asyncHandler(async (req, res, next) => {

    let { content, ratingStar, productInfo, review, updatedImages } = req.body
    const images = req.files

    if (images) {
        const imagesArray = images.map(image =>
        ({
            imageName: image.filename,
            imageUrl: `${process.env.SERVER_URL}/images/products/${convertToLowercase(productInfo.productType)}s/${standardizeFolderNames(productInfo.name)}/review-images/${image.filename}`
        })
        )

        if (updatedImages) {
            updatedImages = JSON.parse(updatedImages)
            review.images = [...updatedImages, ...imagesArray]
        } else {
            review.images = [...review.images, ...imagesArray]
        }
    } else {
        if (updatedImages) {
            updatedImages = JSON.parse(updatedImages)
            review.images = [...updatedImages]
        }
    }

    try {

        review.content = content
        review.ratingStar = ratingStar

        await review.save()

        // remove old images
        if (updatedImages) {
            const folderDest = path.join(__dirname, '..', '..', 'public', 'images', 'products', convertToLowercase(productInfo.productType) + 's', standardizeFolderNames(productInfo.name), 'review-images')

            if (fs.existsSync(folderDest)) {
                const oldImages = fs.readdirSync(folderDest)

                const imageNames = review.images.map(image => image.imageName)

                oldImages.forEach(image => {
                    if (!imageNames.includes(image)) {
                        const filePath = path.join(folderDest, image)

                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath)
                        }
                    }
                })
            }
        }

    } catch (err) {
        // remember to remove if error occur
        if (images) {

            for (const file of req.files) {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path)
                }
            }
        }

        return next(err)
    }

    return res.status(201).json({ message: 'Review is updated' })
})

// delete review
const deleteReview = asyncHandler(async (req, res) => {

    const { review, productInfo } = req.body

    await review.deleteOne()

    const reviewImagesFolder = path.join(__dirname, '..', '..', 'public', 'images', 'products', convertToLowercase(productInfo.productType) + 's', standardizeFolderNames(productInfo.name), 'review-images')

    if (fs.existsSync(reviewImagesFolder)) {
        fs.rmSync(reviewImagesFolder, { recursive: true, force: true })
    }

    return res.json({ message: 'Review is deleted' })
})

// get users liked for a review
const getLikedUsers = asyncHandler(async (req, res) => {

    const { review } = req.body

    if (!review.likes.length) {
        return res.status(404).json({ message: 'Likes not found' })
    }

    const populatedReview = await Review.findOne({ _id: review._id }).populate('likes', 'username email createdAt updatedAt').lean().exec()

    const likedUsers = populatedReview.likes.map(like => like)

    return res.json(likedUsers)
})

// create new like
const createNewLike = asyncHandler(async (req, res) => {

    const { review } = req.body
    const user = req.user

    const userLike = review.likes.includes(user.id)

    if (userLike) {
        return res.sendStatus(204)
    }

    review.likes = [...review.likes, user.id]

    await review.save()

    return res.status(201).json({ message: 'Liked' })
})

// delete like
const deleteLike = asyncHandler(async (req, res) => {

    const { review } = req.body
    const user = req.user

    review.likes = review.likes.filter(id => {
        return id.toString() !== user.id
    })

    await review.save()

    return res.json({ message: 'Unliked' })
})

// get users disliked for a review
const getDislikedUsers = asyncHandler(async (req, res) => {

    const { review } = req.body

    if (!review.dislikes.length) {
        return res.status(404).json({ message: 'Dislikes not found' })
    }

    const populatedReview = await Review.findOne({ _id: review._id }).populate('dislikes', 'username email createdAt updatedAt').lean().exec()

    const dislikedUsers = populatedReview.dislikes.map(dislike => dislike)

    return res.json(dislikedUsers)
})

// create new dislike
const createNewDisLike = asyncHandler(async (req, res) => {

    const { review } = req.body
    const user = req.user

    const userDislike = review.dislikes.includes(user.id)

    if (userDislike) {
        return res.sendStatus(204)
    }

    review.dislikes = [...review.dislikes, user.id]

    await review.save()

    return res.status(201).json({ message: 'Disliked' })
})

// delete dislike
const deleteDislike = asyncHandler(async (req, res) => {

    const { review } = req.body
    const user = req.user

    review.dislikes = review.dislikes.filter(id => {
        return id.toString() !== user.id
    })

    await review.save()

    return res.json({ message: 'Undisliked' })
})

// statistics rating star
const getRatingStarStatistics = asyncHandler(async (req, res) => {

    let { productId } = req.query

    const servedStatisticsResult = await getRatingStarStatisticsHelper(productId)

    if (!servedStatisticsResult.isValid) {
        // return res.status(404).json({ message: servedStatisticsResult.error.message })

        return res.json({
            stars: [
                {
                    star: 1,
                    count: 0,
                    statisticalPercentage: 0
                },
                {
                    star: 2,
                    count: 0,
                    statisticalPercentage: 0
                },
                {
                    star: 3,
                    count: 0,
                    statisticalPercentage: 0
                },
                {
                    star: 4,
                    count: 0,
                    statisticalPercentage: 0
                },
                {
                    star: 5,
                    count: 0,
                    statisticalPercentage: 0
                }
            ],
            totalStars: 0,
            averageRating: 0
        })
    }

    return res.json(servedStatisticsResult.data)
})

module.exports = {
    getALlReviews,
    createNewReview,
    updateReview,
    deleteReview,
    getLikedUsers,
    createNewLike,
    deleteLike,
    getDislikedUsers,
    createNewDisLike,
    deleteDislike,
    getRatingStarStatistics
}