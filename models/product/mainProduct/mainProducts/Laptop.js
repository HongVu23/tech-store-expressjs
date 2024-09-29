const mongoose = require('mongoose')
const Schema = mongoose.Schema

const laptopSchema = new Schema({
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

laptopSchema.index({ name: 'text'})

module.exports = mongoose.model('Laptop', laptopSchema)