const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableVariant = require('../../../../../../models/product/accessory/accessoryVariants/CableVariant')
const CableDetail = require('../../../../../../models/product/accessory/accessoryDetails/CableDetail')
const AccessoryVariantController = require('../../../classes/AccessoryVariantController')

class CableVariantController extends AccessoryVariantController {

    constructor() {
        super('cable', Cable, CableVariant, CableDetail)
    }

}

module.exports = CableVariantController