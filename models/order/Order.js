const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'productType',
        },
        productType: {
            type: String,
            required: true,
            enum: ['LaptopVariant', 'SmartPhoneVariant', 'TabletVariant', 'SmartWatchVariant', 'KeyboardVariant', 'MouseVariant', 'HeadphoneVariant', 'ChargerVariant', 'CableVariant']
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },
        total: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    phoneNumber: {
        type: String,
        minLenght: 10,
        maxLenght: 10,
        match: [/^[0-9]{10}$/, 'Phone number is invalid']
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Payment on delivery', 'Online payment']
    }
    // status: {
    //     type: String,
    //     enum: ['pending', 'processing', 'completed', 'cancelled'],
    //     default: 'pending'
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)