const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneVariant = require('../../../../../../models/product/accessory/accessoryVariants/HeadphoneVariant')
const AccessoryVariantMiddleware = require("../../../classes/AccessoryVariantMiddleware")

class HeadphoneVariantMiddleware extends AccessoryVariantMiddleware {

    constructor() {
        super('headphone', Headphone, HeadphoneVariant)
    }

}

module.exports = HeadphoneVariantMiddleware