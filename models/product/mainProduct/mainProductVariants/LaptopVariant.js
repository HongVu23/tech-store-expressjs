const mongoose = require('mongoose')
const Schema = mongoose.Schema

const laptopVariantSchema = new Schema({
    laptop: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Laptop'
    },
    ram: {
        type: String,
        required: true
    },
    hardDrive: {
        type: String,
        required: true
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
            required: true,
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

module.exports = mongoose.model('LaptopVariant', laptopVariantSchema)