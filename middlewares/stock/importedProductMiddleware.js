
const checkValidDate = (req, res, next) => {

    const { date } = req.body

    if (!date instanceof Date) {
        return res.status(400).json({ message: 'Invalid date' })
    }

    return next()
}

module.exports = {
    checkValidDate
}