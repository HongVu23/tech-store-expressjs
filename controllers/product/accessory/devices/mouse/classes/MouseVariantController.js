const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseVariant = require('../../../../../../models/product/accessory/accessoryVariants/MouseVariant')
const MouseDetail = require('../../../../../../models/product/accessory/accessoryDetails/MouseDetail')
const AccessoryVariantController = require('../../../classes/AccessoryVariantController')

class MouseVariantController extends AccessoryVariantController {

    constructor() {
        super('mouse', Mouse, MouseVariant, MouseDetail)
    }

}

module.exports = MouseVariantController