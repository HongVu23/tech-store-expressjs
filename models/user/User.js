const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    defaultAddress: {
        type: Boolean,
        required: true
    }
})

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is invalid']
    },
    phoneNumber: {
        type: String,
        minLenght: 10,
        maxLenght: 10,
        match: [/^[0-9]{10}$/, 'Phone number is invalid'],
        default: ''
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    address: {
        type: [addressSchema],
        validate: {
            validator: function (addresses) {
                if (!addresses.length) {
                    return true
                }
                const uniqueAddresses = new Set(addresses.map(address => address.address))
                const defaultAddressCount = addresses.filter(address => address.defaultAddress).length
                return uniqueAddresses.size === addresses.length && defaultAddressCount === 1
            },
            message: 'User only has one default address and addresses must be unique'
        }
    },
    avatar: {
        imageName: {
            type: String,
            default: 'default-avatar.jpg'
        },
        imageUrl: {
            type: String,
            default: `${process.env.SERVER_URL}/images/users/default-avatar/default-avatar.jpg`
        }
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

userSchema.index({ username: 'text'})

module.exports = mongoose.model('User', userSchema)