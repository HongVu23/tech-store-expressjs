const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Review = require('../../../models/social/Review')

// statistics for specific rating star
const specificStarStatistics = (count, totalStar) => {

    const ratingStarPercentage = (count / totalStar) * 100

    return ratingStarPercentage
}

// get 
const getRatingStarStatisticsHelper = async (productId) => {

    productId = new mongoose.Types.ObjectId(productId)

    const statisticsResult = await Review.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: "$ratingStar",
                count: { $sum: 1 }
            }
        },
        {
            $addFields: {
                star: "$_id"
            }
        },
        {
            $project: {
                star: 1,
                count: 1,
                _id: 0
            }
        },
        {
            $sort: {
                star: 1
            }
        }
    ])

    // total stars
    let totalStars = 0

    statisticsResult.forEach(item => {
        totalStars += item.count
    })

    if (!totalStars) {
        // return res.status(404).json({ message: 'No reviews found' })
        return { isValid: false, error: { message: 'No reviews found' } }
    }

    // statisticsResult object
    let servedStatisticsResult = [
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
    ]

    statisticsResult.forEach(item => {

        for (const i of servedStatisticsResult) {
            
            if (i.star === item.star) {
                i.count = item.count
                i.statisticalPercentage = specificStarStatistics(item.count, totalStars)
                break
            }
        }
    })

    let totalWeightedRating = 0

    servedStatisticsResult.forEach(item => {

        totalWeightedRating += item.star * item.count
    })

    const averageRating = totalWeightedRating / totalStars

    servedStatisticsResult = {
        stars: servedStatisticsResult,
        totalStars,
        averageRating
    }

    return { isValid: true, data: servedStatisticsResult }
}

module.exports = {
    specificStarStatistics,
    getRatingStarStatisticsHelper
}