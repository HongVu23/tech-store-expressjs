const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keyboardSchema = new Schema({
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

keyboardSchema.index({ name: 'text'})

module.exports = mongoose.model('Keyboard', keyboardSchema)