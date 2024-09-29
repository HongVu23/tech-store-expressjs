const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardVariant = require('../../../../../../models/product/accessory/accessoryVariants/KeyboardVariant')
const KeyboardDetail = require('../../../../../../models/product/accessory/accessoryDetails/KeyboardDetail')
const AccessoryVariantController = require('../../../classes/AccessoryVariantController')

class KeyboardVariantController extends AccessoryVariantController {

    constructor() {
        super('keyboard', Keyboard, KeyboardVariant, KeyboardDetail)
    }

}

module.exports = KeyboardVariantController