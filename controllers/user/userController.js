const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../../models/user/User')
const { standardizeFolderNames } = require('../../utils/standardizeNames')

// get all users 
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({ role: 'User' }).select('-password').lean().exec()

    if (!users.length) {
        return res.status(404).json({ message: 'No users found' })
    }

    return res.json(users)
})

// create new user
const createNewUser = asyncHandler(async (req, res) => {

    const { username, password, email, phoneNumber, address } = req.body

    // check duplicate username
    const duplicateName = await User.findOne({ username }).lean().exec()

    if (duplicateName) {
        return res.status(404).json({ message: 'Duplicate user' })
    }

    // check duplicate user email
    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateEmail) {
        return res.status(404).json({ message: 'Duplicate email' })
    }

    const hashPwd = await bcrypt.hash(password, 10)

    await User.create({ username, password: hashPwd, email, phoneNumber, address })

    return res.status(201).json({ message: 'User is created' })
})

// update user
const updateUser = asyncHandler(async (req, res) => {

    let { user, username, password, email, phoneNumber, address, status } = req.body
    const loginUser = req.user

    if (loginUser.role === 'User') {

        if (!username || !email || phoneNumber == undefined || phoneNumber == null || !address) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // check whether user id param and user id from token is match or not
        if (loginUser.id !== user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        if (status) {
            return res.status(403).json({ message: 'Forbidden' })
        }

        // asign status for user
        status = user.status
    } else {
        if (!username || !email || phoneNumber == undefined || phoneNumber == null || !address || status == undefined || status == null) {
            return res.status(400).json({ message: 'All fields are required' })
        }
    }

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    user.username = username
    user.email = email
    user.phoneNumber = phoneNumber
    user.address = address
    user.status = status

    await user.save()

    if (loginUser.role === 'User') {

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": user._id,
                    "username": user.username,
                    "role": user.role,
                    "avatar": user.avatar.imageUrl
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        )

        // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            // httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })

        // Send accessToken containing username and role 
        return res.json({ accessToken })
    }

    return res.json({ message: 'User is updated' })
})

// delete user
const deleteUser = asyncHandler(async (req, res) => {

    const { user } = req.body

    const userName = user.username

    await user.deleteOne()

    // delete user avatar
    const userFolderDest = path.join(__dirname, '..', '..', 'public', 'images', 'users', standardizeFolderNames(userName))

    if (fs.existsSync(userFolderDest)) {
        fs.rmSync(userFolderDest, { recursive: true, force: true })
    }

    return res.json({ message: 'User is deleted' })
})

// get user
const getUser = asyncHandler(async (req, res) => {

    const { user } = req.body
    const loginUser = req.user

    // check whether user id param and user id from token is match or not
    if (loginUser.role === 'User') {
        if (loginUser.id !== user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden' })
        }
    }

    const { password, ...userWithoutPwd } = user.toObject()

    return res.json(userWithoutPwd)
})

// update user avatar
const updateAvatar = asyncHandler(async (req, res, next) => {

    const { user } = req.body
    const image = req.file

    const oldAvatar = user.avatar.imageName

    user.avatar = {
        imageName: image.originalname,
        imageUrl: `${process.env.SERVER_URL}/images/users/${standardizeFolderNames(user.username)}/${image.originalname}`
    }

    try {
        await user.save()

        // remove old image
        const oldAvatarDest = path.join(image.destination, oldAvatar)

        if (fs.existsSync(oldAvatarDest)) {
            fs.unlinkSync(oldAvatarDest)
        }

    } catch (err) {
        // remove avatar image if error occur
        if (fs.existsSync(image.path)) {
            fs.unlinkSync(image.path)
        }

        return next(err)
    }

    return res.status(201).json({ message: 'Avatar is updated' })
})

// delete avatar
const deleteAvatar = asyncHandler(async (req, res) => {

    const { user } = req.body

    const userInfo = { username: user.username, avatar: user.avatar }

    user.avatar = {
        imageName: 'default-avatar.jpg',
        imageUrl: 'http://localhost:3500/images/users/default-avatar/default-avatar.jpg'
    }

    await user.save()

    const folderDest = path.join(__dirname, '..', '..', 'public', 'images', 'users', standardizeFolderNames(userInfo.username))

    if (fs.existsSync(folderDest)) {
        fs.rmSync(folderDest, { recursive: true, force: true })
    }

    return res.json({ message: 'Avatar is deleted' })
})

// search user
const searchUser = asyncHandler(async (req, res) => {

    const { text } = req.query

    if (!text) {
        // return res.sendStatus(204)
        return res.json([])
    }
    
    const regex = new RegExp(text, 'i')

    const searchResults = await User.find({
        $or: [
            { username: regex },
            { email: regex }
        ]
    }).lean().exec()

    return res.json(searchResults)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser,
    updateAvatar,
    deleteAvatar,
    searchUser
}