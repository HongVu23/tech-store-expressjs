const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'productType'
    },
    productType: {
        type: String,
        required: true,
        enum: ['Laptop', 'SmartPhone', 'Tablet', 'SmartWatch', 'Keyboard', 'Mouse', 'Headphone', 'Charger', 'Cable']
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    images: [{
        imageName: {
            type: String,
            required: true
        }, 
        imageUrl: {
            type: String,
            required: true
        }
    }],
    ratingStar: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    }
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

module.exports = mongoose.model('Review', reviewSchema)