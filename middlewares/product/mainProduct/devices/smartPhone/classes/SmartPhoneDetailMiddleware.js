const SmartPhone = require('../../../../../../models/product/mainProduct/mainProducts/SmartPhone')
const SmartPhoneDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/SmartPhoneDetail')
const MainProductDetailMiddleware = require('../../../classes/MainProductDetailMiddleware')

class SmartPhoneDetailMiddleware extends MainProductDetailMiddleware {

    constructor() {
        super('smartPhone', SmartPhone, SmartPhoneDetail)
    }

    // @override
    // check required fields for create new product variant
    checkRequiredFieldsCNPD(req, res, next) {

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            camera,
            selfie,
            operatingSystemAndCPU,
            ramRom,
            connection,
            batteryAndCharger,
            utility,
            generalInformation
        } = req.body

        if (!guaranteePeriod || !includedAccessories || !screen || !camera || !selfie || !operatingSystemAndCPU || !ramRom || !connection || !batteryAndCharger || !utility || !generalInformation) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }
}

module.exports = SmartPhoneDetailMiddleware