const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseVariant = require('../../../../../../models/product/accessory/accessoryVariants/MouseVariant')
const AccessoryController = require('../../../classes/AccessoryController')

class MouseController extends AccessoryController {

    constructor() {
        super('mouse', Mouse, MouseVariant)
    }

}

module.exports = MouseController