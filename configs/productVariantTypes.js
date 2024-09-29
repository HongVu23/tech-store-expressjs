const LaptopVariant = require('../models/product/mainProduct/mainProductVariants/LaptopVariant')
const SmartPhoneVariant = require('../models/product/mainProduct/mainProductVariants/SmartPhoneVariant')
const TabletVariant = require('../models/product/mainProduct/mainProductVariants/TabletVariant')
const SmartWatchVariant = require('../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const KeyboardVariant = require('../models/product/accessory/accessoryVariants/KeyboardVariant')
const MouseVariant = require('../models/product/accessory/accessoryVariants/MouseVariant')
const HeadphoneVariant = require('../models/product/accessory/accessoryVariants/HeadphoneVariant')
const ChargerVariant = require('../models/product/accessory/accessoryVariants/ChargerVariant')
const CableVariant = require('../models/product/accessory/accessoryVariants/CableVariant')

const productVariantTypes = [
    { 
        name: 'LaptopVariant',
        model: LaptopVariant
    },
    {
        name: 'SmartPhoneVariant',
        model: SmartPhoneVariant
    },
    {
        name: 'TabletVariant',
        model: TabletVariant
    },
    {
        name: 'SmartWatchVariant',
        model: SmartWatchVariant
    },
    {
        name: 'KeyboardVariant',
        model: KeyboardVariant
    },
    {
        name: 'MouseVariant',
        model: MouseVariant
    },
    {
        name: 'HeadphoneVariant',
        model: HeadphoneVariant
    },
    {
        name: 'ChargerVariant',
        model: ChargerVariant
    },
    {
        name: 'CableVariant',
        model: CableVariant
    }
]

module.exports = productVariantTypes