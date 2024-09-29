const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
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
    replyComments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    isReplyComment: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

module.exports = mongoose.model('Comment', commentSchema)