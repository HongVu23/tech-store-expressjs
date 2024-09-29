const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartPhoneSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

smartPhoneSchema.index({ name: 'text'})

module.exports = mongoose.model('SmartPhone', smartPhoneSchema)