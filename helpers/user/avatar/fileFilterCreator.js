const mongoose = require('mongoose')
const User = require('../../../models/user/User')
const { checkFileExt } = require('../../uploadFile/checkFileExt')

// check whether user id is exist or not
const checkUserIdExistence = async (userId) => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return { isValid: false, error: { message: 'User not found' } }
    }

    let user

    try {
        user = await User.findOne({ _id: userId }).exec()
    } catch (err) {
        return { isValid: false, error: { message: err.message } }
    }

    if (!user) {
        return { isValid: false, error: { message: 'User not found' } }
    }

    return { isValid: true, data: user }
}

// check whether user id from login user is equal to user id param or not
const checkValidUser = (userIdParam, userIdLogin) => {

    if (userIdLogin !== userIdParam) {
        return { isValid: false, error: { message: 'Forbidden' } }
    } 

    return { isValid: true }
}

const fileFilterCreator = () => {

    const fileFilter = async (req, file, cb) => {

        const { userId } = req.params
        const loginUser = req.user

        const checkFileExtResult = checkFileExt(file.originalname)

        if (!checkFileExtResult.isValid) {
            return cb(new Error(checkFileExtResult.error.message))
        }

        const checkUserIdExistenceResult = await checkUserIdExistence(userId)

        if (!checkUserIdExistenceResult.isValid) {
            return cb(new Error(checkUserIdExistenceResult.error.message))
        }

        const checkValidUserResult = checkValidUser(userId, loginUser.id)

        if (!checkValidUserResult.isValid) {
            return cb(new Error(checkValidUserResult.error.message))
        }

        // user
        const user = checkUserIdExistenceResult.data

        // asign user to req.body
        req.body.user = user

        return cb(null, true)
    }

    return fileFilter
}

module.exports = {
    fileFilterCreator
}