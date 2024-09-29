
const verifyAdminRole = (req, res, next) => {

    const { user } = req

    if (user.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' })
    } 

    return next()
}

module.exports = verifyAdminRole