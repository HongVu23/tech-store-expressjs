const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableVariant = require('../../../../../../models/product/accessory/accessoryVariants/CableVariant')
const AccessoryMiddleware = require("../../../classes/AccessoryMiddleware")

class CableMiddleware extends AccessoryMiddleware {

    constructor() {
        super('cable', Cable, CableVariant)
    }

}

module.exports = CableMiddleware