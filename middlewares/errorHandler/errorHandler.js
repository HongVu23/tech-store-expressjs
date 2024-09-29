const { logEvents } = require('../logger/logger')

const errorHandler = (err, req, res, next) => {
    console.log("Final error handler middleware")

    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = 500 // server error
    
    res.status(status).json({ message: `${err.message}...` })
}

module.exports = errorHandler