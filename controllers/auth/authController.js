const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user/User')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    // check whether user is enable or not
    if (!foundUser.status) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "id": foundUser._id,
                "username": foundUser.username,
                "role": foundUser.role,
                "avatar": foundUser.avatar.imageUrl
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: foundUser.role === 'Admin' ? '1d' : '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
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
    res.json({ accessToken })
})

// @desc Register
// @route POST /auth/register
// @access Public
const register = asyncHandler(async (req, res) => {

    const { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // check duplicate
    const duplicateUsername = await User.findOne({ username }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const duplicateEmail = await User.findOne({ email }).lean().exec()

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    const hashPwd = await bcrypt.hash(password, 10)

    await User.create({
        username,
        password: hashPwd,
        email
    })

    return res.status(201).json({ message: 'Register success' })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "username": foundUser.username,
                        "role": foundUser.role,
                        "avatar": foundUser.avatar.imageUrl
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: foundUser.role === 'Admin' ? '1d' : '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { /*httpOnly: true,*/ sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

// @desc Change password
// @route PATCH /auth/changePassword
// @access Public - just to clear cookie if exists
const changePassword = asyncHandler(async (req, res) => {

    const { email, oldPassword, newPassword } = req.body

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // check whether use is exist or not
    const user = await User.findOne({ email }).exec()

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(oldPassword, user.password)

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashNewPassword

    await user.save()

    return res.json({ message: 'Password is updated' })
})

module.exports = {
    login,
    register,
    refresh,
    logout,
    changePassword
}