const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cableDetailSchema = new Schema({
    cable: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Cable'
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

module.exports = mongoose.model('CableDetail', cableDetailSchema)