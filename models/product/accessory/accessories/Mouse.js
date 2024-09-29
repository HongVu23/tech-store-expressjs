const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mouseSchema = new Schema({
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

mouseSchema.index({ name: 'text'})

module.exports = mongoose.model('Mouse', mouseSchema)