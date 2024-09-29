const SmartPhone = require('../../../../../../models/product/mainProduct/mainProducts/SmartPhone')
const SmartPhoneVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartPhoneVariant')
const MainProductMiddleware = require("../../../classes/MainProductMiddleware")

class SmartPhoneMiddleware extends MainProductMiddleware {

    constructor() {
        super('smartPhone', SmartPhone, SmartPhoneVariant)
    }

}

module.exports = SmartPhoneMiddleware