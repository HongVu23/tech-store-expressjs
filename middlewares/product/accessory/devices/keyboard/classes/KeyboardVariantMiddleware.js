const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardVariant = require('../../../../../../models/product/accessory/accessoryVariants/KeyboardVariant')
const AccessoryVariantMiddleware = require("../../../classes/AccessoryVariantMiddleware")

class KeyboardVariantMiddleware extends AccessoryVariantMiddleware {

    constructor() {
        super('keyboard', Keyboard, KeyboardVariant)
    }

}

module.exports = KeyboardVariantMiddleware