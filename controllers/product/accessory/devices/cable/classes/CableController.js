const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableVariant = require('../../../../../../models/product/accessory/accessoryVariants/CableVariant')
const AccessoryController = require('../../../classes/AccessoryController')

class CableController extends AccessoryController {

    constructor() {
        super('cable', Cable, CableVariant)
    }

}

module.exports = CableController