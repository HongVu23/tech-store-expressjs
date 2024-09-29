const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardVariant = require('../../../../../../models/product/accessory/accessoryVariants/KeyboardVariant')
const AccessoryController = require('../../../classes/AccessoryController')

class KeyboardController extends AccessoryController {

    constructor() {
        super('keyboard', Keyboard, KeyboardVariant)
    }

}

module.exports = KeyboardController