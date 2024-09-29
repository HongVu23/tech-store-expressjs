const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerVariant = require('../../../../../../models/product/accessory/accessoryVariants/ChargerVariant')
const AccessoryMiddleware = require("../../../classes/AccessoryMiddleware")

class ChargerMiddleware extends AccessoryMiddleware {

    constructor() {
        super('charger', Charger, ChargerVariant)
    }

}

module.exports = ChargerMiddleware