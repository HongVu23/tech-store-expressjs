const Laptop = require('../models/product/mainProduct/mainProducts/Laptop')
const SmartPhone = require('../models/product/mainProduct/mainProducts/SmartPhone')
const Tablet = require('../models/product/mainProduct/mainProducts/Tablet')
const SmartWatch = require('../models/product/mainProduct/mainProducts/SmartWatch')
const Keyboard = require('../models/product/accessory/accessories/Keyboard')
const Mouse = require('../models/product/accessory/accessories/Mouse')
const Headphone = require('../models/product/accessory/accessories/Headphone')
const Charger = require('../models/product/accessory/accessories/Charger')
const Cable = require('../models/product/accessory/accessories/Cable')

const productTypes = [
    { 
        name: 'Laptop',
        model: Laptop
    },
    {
        name: 'SmartPhone',
        model: SmartPhone
    },
    {
        name: 'Tablet',
        model: Tablet
    },
    {
        name: 'SmartWatch',
        model: SmartWatch
    },
    {
        name: 'Keyboard',
        model: Keyboard
    },
    {
        name: 'Mouse',
        model: Mouse
    },
    {
        name: 'Headphone',
        model: Headphone
    },
    {
        name: 'Charger',
        model: Charger
    },
    {
        name: 'Cable',
        model: Cable
    }
]

module.exports = productTypes