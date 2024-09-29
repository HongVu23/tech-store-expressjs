const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneVariant = require('../../../../../../models/product/accessory/accessoryVariants/HeadphoneVariant')
const AccessoryMiddleware = require("../../../classes/AccessoryMiddleware")

class HeadphoneMiddleware extends AccessoryMiddleware {

    constructor() {
        super('headphone', Headphone, HeadphoneVariant)
    }

}

module.exports = HeadphoneMiddleware