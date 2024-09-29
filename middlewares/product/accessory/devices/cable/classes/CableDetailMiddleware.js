const Cable = require('../../../../../../models/product/accessory/accessories/Cable')
const CableDetail = require('../../../../../../models/product/accessory/accessoryDetails/CableDetail')
const AccessoryDetailMiddleware = require('../../../classes/AccessoryDetailMiddleware')

class CableDetailMiddleware extends AccessoryDetailMiddleware {

    constructor() {
        super('cable', Cable, CableDetail)
    }

}

module.exports = CableDetailMiddleware