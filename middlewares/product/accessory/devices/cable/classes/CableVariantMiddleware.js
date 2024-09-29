const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableVariant = require('../../../../../../models/product/accessory/accessoryVariants/CableVariant')
const AccessoryVariantMiddleware = require("../../../classes/AccessoryVariantMiddleware")

class CableVariantMiddleware extends AccessoryVariantMiddleware {

    constructor() {
        super('cable', Cable, CableVariant)
    }

}

module.exports = CableVariantMiddleware