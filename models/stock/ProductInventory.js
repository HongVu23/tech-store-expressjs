const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productInventorySchema = new Schema({
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
        required: true,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductInventory', productInventorySchema)