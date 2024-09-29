const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardVariant = require('../../../../../../models/product/accessory/accessoryVariants/KeyboardVariant')
const KeyboardDetail = require('../../../../../../models/product/accessory/accessoryDetails/KeyboardDetail')
const AccessoryDetailController = require('../../../classes/AccessoryDetailController')

class KeyboardDetailController extends AccessoryDetailController {

    constructor() {
        super('keyboard', Keyboard, KeyboardVariant, KeyboardDetail)
    }

}

module.exports = KeyboardDetailController