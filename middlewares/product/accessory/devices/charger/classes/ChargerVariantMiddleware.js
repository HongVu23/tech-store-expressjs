const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerVariant = require('../../../../../../models/product/accessory/accessoryVariants/ChargerVariant')
const AccessoryVariantMiddleware = require("../../../classes/AccessoryVariantMiddleware")

class ChargerVariantMiddleware extends AccessoryVariantMiddleware {

    constructor() {
        super('charger', Charger, ChargerVariant)
    }

}

module.exports = ChargerVariantMiddleware