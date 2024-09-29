const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseVariant = require('../../../../../../models/product/accessory/accessoryVariants/MouseVariant')
const MouseDetail = require('../../../../../../models/product/accessory/accessoryDetails/MouseDetail')
const AccessoryDetailController = require('../../../classes/AccessoryDetailController')

class MouseDetailController extends AccessoryDetailController {

    constructor() {
        super('mouse', Mouse, MouseVariant, MouseDetail)
    }

}

module.exports = MouseDetailController