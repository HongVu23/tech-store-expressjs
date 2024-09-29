require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const errorHandler = require('./middlewares/errorHandler/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const connectDB = require('./configs/dbConn')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { logger, logEvents } = require('./middlewares/logger/logger')
const PORT = process.env.PORT || 3501

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }));

app.use(express.json())

// config body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

// auth routes
app.use('/auth', require('./routes/auth/authRoutes'))

// product routes
app.use('/products', require('./routes/product/productRoute.js'))

// main product routes
app.use('/products/laptops', require('./routes/product/mainProducts/laptop'))
app.use('/products/smartPhones', require('./routes/product/mainProducts/smartPhone'))
app.use('/products/tablets', require('./routes/product/mainProducts/tablet'))
app.use('/products/smartWatches', require('./routes/product/mainProducts/smartWatch'))

// accessory routes
app.use('/products/cables', require('./routes/product/accessories/cable'))
app.use('/products/chargers', require('./routes/product/accessories/charger'))
app.use('/products/keyboards', require('./routes/product/accessories/keyboard'))
app.use('/products/mouses', require('./routes/product/accessories/mouse'))
app.use('/products/headphones', require('./routes/product/accessories/headphone'))

// user routes
app.use('/users', require('./routes/user/userRoute'))

// comment routes
app.use('/comments', require('./routes/social/commentRoute'))

// review routes
app.use('/reviews', require('./routes/social/reviewRoute'))

// order routes
app.use('/orders', require('./routes/order/orderRoute'))

// stock routes
app.use('/stock', require('./routes/stock/stockRoute.js'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})