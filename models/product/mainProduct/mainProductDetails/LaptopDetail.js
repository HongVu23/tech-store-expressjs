const mongoose = require('mongoose')
const Schema = mongoose.Schema

const laptopDetailSchema = new Schema({
    laptop: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Laptop'
    },
    guaranteePeriod: {
        type: Number,
        required: true,
        min: 0
    },
    includedAccessories: [{
        type: String
    }],
    processor: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    ramMemoryAndHardDrive: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    screen: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    graphicsAndAudio: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    connectionPortAndExpansionFeature: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    sizeAndWeight: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    additionalInformation: [{
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

module.exports = mongoose.model('LaptopDetail', laptopDetailSchema)