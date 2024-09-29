const Charger = require('../../../../../../models/product/accessory/accessories/Charger')
const ChargerDetail = require('../../../../../../models/product/accessory/accessoryDetails/ChargerDetail')
const AccessoryDetailMiddleware = require('../../../classes/AccessoryDetailMiddleware')

class ChargerDetailMiddleware extends AccessoryDetailMiddleware {

    constructor() {
        super('charger', Charger, ChargerDetail)
    }

}

module.exports = ChargerDetailMiddleware