const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerVariant = require('../../../../../../models/product/accessory/accessoryVariants/ChargerVariant')
const ChargerDetail = require('../../../../../../models/product/accessory/accessoryDetails/ChargerDetail')
const AccessoryVariantController = require('../../../classes/AccessoryVariantController')

class ChargerVariantController extends AccessoryVariantController {

    constructor() {
        super('charger', Charger, ChargerVariant, ChargerDetail)
    }

}

module.exports = ChargerVariantController