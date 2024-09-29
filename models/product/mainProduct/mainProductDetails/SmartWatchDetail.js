const mongoose = require('mongoose')
const Schema = mongoose.Schema

const smartWatchDetailSchema = new Schema({
    smartWatch: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SmartWatch'
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
    design: [{
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
    battery: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String
        }
    }],
    configurationAndConnection: [{
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

module.exports = mongoose.model('SmartWatchDetail', smartWatchDetailSchema)