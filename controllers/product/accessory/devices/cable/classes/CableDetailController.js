const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableVariant = require('../../../../../../models/product/accessory/accessoryVariants/CableVariant')
const CableDetail = require('../../../../../../models/product/accessory/accessoryDetails/CableDetail')
const AccessoryDetailController = require('../../../classes/AccessoryDetailController')

class CableDetailController extends AccessoryDetailController {

    constructor() {
        super('cable', Cable, CableVariant, CableDetail)
    }

}

module.exports = CableDetailController