const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
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
        enum: ['LaptopVariant', 'SmartPhoneVariant', 'TabletVariant', 'SmartWatchVariant', 'KeyboardVariant', 'MouseVariant', 'HeadphoneVariant', 'ChargerVariant', 'CableVariant']
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)