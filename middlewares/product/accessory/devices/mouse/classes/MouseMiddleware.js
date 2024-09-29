const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseVariant = require('../../../../../../models/product/accessory/accessoryVariants/MouseVariant')
const AccessoryMiddleware = require("../../../classes/AccessoryMiddleware")

class MouseMiddleware extends AccessoryMiddleware {

    constructor() {
        super('mouse', Mouse, MouseVariant)
    }

}

module.exports = MouseMiddleware