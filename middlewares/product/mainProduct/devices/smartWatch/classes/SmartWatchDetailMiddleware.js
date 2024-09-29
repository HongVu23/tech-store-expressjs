const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/SmartWatchDetail')
const MainProductDetailMiddleware = require('../../../classes/MainProductDetailMiddleware')

class SmartWatchDetailMiddleware extends MainProductDetailMiddleware {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchDetail)
    }

    // @override
    // check required fields for create new product variant
    checkRequiredFieldsCNPD(req, res, next) {

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            design,
            utility,
            battery,
            configurationAndConnection,
            additionalInformation
        } = req.body

        if (!guaranteePeriod || !includedAccessories || !screen || !design || !utility || !battery || !configurationAndConnection || !additionalInformation) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }
}

module.exports = SmartWatchDetailMiddleware