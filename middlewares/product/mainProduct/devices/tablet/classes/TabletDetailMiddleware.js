const Tablet = require('../../../../../../models/product/mainProduct/mainProducts/Tablet')
const TabletDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/TabletDetail')
const MainProductDetailMiddleware = require('../../../classes/MainProductDetailMiddleware')

class SmartPhoneDetailMiddleware extends MainProductDetailMiddleware {

    constructor() {
        super('tablet', Tablet, TabletDetail)
    }

    // @override
    // check required fields for create new product variant
    checkRequiredFieldsCNPD(req, res, next) {

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            operatingSystemAndCPU,
            ramRom,
            camera,
            selfie,
            connection,
            utility,
            batteryAndCharger,
            generalInformation
        } = req.body

        if (!guaranteePeriod || !includedAccessories || !screen || !operatingSystemAndCPU || !ramRom || !camera || !selfie || !connection || !utility || !batteryAndCharger || !generalInformation) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }
}

module.exports = SmartPhoneDetailMiddleware