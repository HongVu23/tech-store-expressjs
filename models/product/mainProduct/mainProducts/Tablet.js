const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tabletSchema = new Schema({
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

tabletSchema.index({ name: 'text'})

module.exports = mongoose.model('Tablet', tabletSchema)