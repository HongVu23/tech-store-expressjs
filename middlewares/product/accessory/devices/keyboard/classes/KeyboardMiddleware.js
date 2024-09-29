const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardVariant = require('../../../../../../models/product/accessory/accessoryVariants/KeyboardVariant')
const AccessoryMiddleware = require("../../../classes/AccessoryMiddleware")

class KeyboardMiddleware extends AccessoryMiddleware {

    constructor() {
        super('keyboard', Keyboard, KeyboardVariant)
    }

}

module.exports = KeyboardMiddleware