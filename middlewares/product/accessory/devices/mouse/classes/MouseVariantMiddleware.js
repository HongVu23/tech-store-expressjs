const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseVariant = require('../../../../../../models/product/accessory/accessoryVariants/MouseVariant')
const AccessoryVariantMiddleware = require("../../../classes/AccessoryVariantMiddleware")

class MouseVariantMiddleware extends AccessoryVariantMiddleware {

    constructor() {
        super('mouse', Mouse, MouseVariant)
    }

}

module.exports = MouseVariantMiddleware