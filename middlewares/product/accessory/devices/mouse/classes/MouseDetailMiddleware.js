const Mouse = require('../../../../../../models/product/accessory/accessories/Mouse')
const MouseDetail = require('../../../../../../models/product/accessory/accessoryDetails/MouseDetail')
const AccessoryDetailMiddleware = require('../../../classes/AccessoryDetailMiddleware')

class MouseDetailMiddleware extends AccessoryDetailMiddleware {

    constructor() {
        super('mouse', Mouse, MouseDetail)
    }

}

module.exports = MouseDetailMiddleware