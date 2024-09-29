const mongoose = require('mongoose')
const Schema = mongoose.Schema

const headphoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

headphoneSchema.index({ name: 'text'})

module.exports = mongoose.model('Headphone', headphoneSchema)