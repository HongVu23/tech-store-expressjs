const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartWatchVariant = new Schema({
    smartWatch: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SmartWatch'
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        discountPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        discountEndDate: {
            type: Date,
            required: function () {
                return this.discount.discountPercentage !== 0
            }
            // validate: {
            //     validator: function (value) {
            //         return value > new Date();
            //     },
            //     message: 'Discount end time must be in the future'
            // }
        }
    },
    image: {
        imageName: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    status: {
        type: Boolean,
        default: true,
        enum: [true, false]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('SmartWatchVariant', smartWatchVariant)