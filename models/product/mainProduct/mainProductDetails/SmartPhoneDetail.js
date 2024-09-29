const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartPhoneDetailSchema = new Schema({
    smartPhone: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SmartPhone'
    },
    guaranteePeriod: {
        type: Number,
        required: true,
        min: 0
    },
    includedAccessories: [{
        type: String
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
    camera: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    selfie: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
    }],
    operatingSystemAndCPU: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    ramRom: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    connection: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    batteryAndCharger: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    utility: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    generalInformation: [{
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

module.exports = mongoose.model('SmartPhoneDetail', smartPhoneDetailSchema)