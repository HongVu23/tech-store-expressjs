const mongoose = require('mongoose')
const multer = require('multer')
const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User')
const { fileFilterCreator } = require('../../helpers/user/avatar/fileFilterCreator')
const { storageCreator } = require('../../helpers/user/avatar/storageCreator')
const { fileSizeLimiterCreator } = require('../../helpers/uploadFile/fileSizeLimiterCreator')
const { configUploadSingle } = require('../../helpers/uploadFile/configUpload')

// check require fields
const checkRequiedFields = (req, res, next) => {
    
    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    return next()
}

// check whether user id is exist or not
const checkIdExistence = asyncHandler(async (req, res, next) => {

    const { userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: 'User not found' })
    }

    const user = await User.findOne({ _id: userId }).exec()

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    // asign user to req.body
    req.body.user = user

    return next()
})

// --- avatar
// configure for upload image and validate data for create new avatar
const setUpload = () => {

    const storage = storageCreator()

    const fileFilter = fileFilterCreator()

    const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

    return configUploadSingle(storage, fileFilter, fileSizeLimiter, 'image')
}

const uploadForAvatar = setUpload()

// upload file and validation for create new avatar
const checkForAvatar = (req, res, next) => {

    uploadForAvatar(req, res, (err) => {

        if (err instanceof multer.MulterError) {
            // error related to multer error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
            } else {
                return res.status(500).json({ message: err + '. Upload failed due to multer error' })
            }
        } else if (err) {
            if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                return res.status(403).json({ message: err.message })
            } else if (err.message === 'User not found') {
                return res.status(404).json({ message: err.message })
            } else if (err.message === 'Forbidden') {
                return res.status(403).json({ message: err.message })
            } else {
                return next(err)
            }
        }

        if (!req?.file) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    })
}

// check whether user id from login user is equal to user id param or not
const checkValidUser = (req, res, next) => {

    const { userId } = req.params
    const user = req.user

    if (user.id !== userId) {
        return res.status(403).json({ message: 'Forbidden' })
    } 

    return next()
}

module.exports = {
    checkIdExistence,
    checkRequiedFields,
    checkForAvatar,
    checkValidUser
}