const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartWatchSchema = new Schema({
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

smartWatchSchema.index({ name: 'text'})

module.exports = mongoose.model('SmartWatch', smartWatchSchema)