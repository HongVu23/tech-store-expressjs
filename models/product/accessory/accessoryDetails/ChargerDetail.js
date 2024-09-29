const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chargerDetailSchema = new Schema({
    charger: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Charger'
    },
    guaranteePeriod: {
        type: Number,
        required: true,
        min: 0
    },
    includedAccessories: [{
        type: String
    }],
    details: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    colors: [{
        color: {
            type: String,
            required: true
        },
        colorImages: [{
            imageName: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        }]
    }],
    highlightedImages: [{
        imageName: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('ChargerDetail', chargerDetailSchema)