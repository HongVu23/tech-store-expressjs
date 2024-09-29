const Keyboard = require('../../../../../../models/product/accessory/accessories/Keyboard')
const KeyboardDetail = require('../../../../../../models/product/accessory/accessoryDetails/KeyboardDetail')
const AccessoryDetailMiddleware = require('../../../classes/AccessoryDetailMiddleware')

class KeyboardDetailMiddleware extends AccessoryDetailMiddleware {

    constructor() {
        super('keyboard', Keyboard, KeyboardDetail)
    }

}

module.exports = KeyboardDetailMiddleware