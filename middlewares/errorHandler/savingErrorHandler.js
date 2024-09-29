const { logEvents } = require('../logger/logger')

// error handling middlewares for saving 
const savingErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("hello. I'm savingErrorHandlerMiddleware")

    if (err.name === 'ValidationError') {
        console.log(err.stack)
        logEvents(`${err.name}: ${err.message}\t${req.method}\t/products/laptops${req.url}\t${req.headers.origin}`, 'errLog.log')
        return res.status(400).json({ message: err.message }) 
    }

    next(err)
}

module.exports = {
    savingErrorHandlerMiddleware
}