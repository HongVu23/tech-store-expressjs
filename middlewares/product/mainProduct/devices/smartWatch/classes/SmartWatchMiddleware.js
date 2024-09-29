const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const MainProductMiddleware = require("../../../classes/MainProductMiddleware")

class SmartWatchMiddleware extends MainProductMiddleware {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchVariant)
    }

}

module.exports = SmartWatchMiddleware