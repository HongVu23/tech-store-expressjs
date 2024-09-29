const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteProductSchema = new Schema({
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('FavoriteProduct', favoriteProductSchema)