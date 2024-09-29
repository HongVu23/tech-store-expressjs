const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerVariant = require('../../../../../../models/product/accessory/accessoryVariants/ChargerVariant')
const ChargerDetail = require('../../../../../../models/product/accessory/accessoryDetails/ChargerDetail')
const AccessoryDetailController = require('../../../classes/AccessoryDetailController')

class ChargerDetailController extends AccessoryDetailController {

    constructor() {
        super('charger', Charger, ChargerVariant, ChargerDetail)
    }

}

module.exports = ChargerDetailController