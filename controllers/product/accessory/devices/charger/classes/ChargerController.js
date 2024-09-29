const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerVariant = require('../../../../../../models/product/accessory/accessoryVariants/ChargerVariant')
const AccessoryController = require('../../../classes/AccessoryController')

class ChargerController extends AccessoryController {

    constructor() {
        super('charger', Charger, ChargerVariant)
    }

}

module.exports = ChargerController