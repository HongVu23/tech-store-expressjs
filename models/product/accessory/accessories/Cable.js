const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cableSchema = new Schema({
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

cableSchema.index({ name: 'text'})

module.exports = mongoose.model('Cable', cableSchema)