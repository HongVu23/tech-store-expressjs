const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chargerSchema = new Schema({
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

chargerSchema.index({ name: 'text'})

module.exports = mongoose.model('Charger', chargerSchema)