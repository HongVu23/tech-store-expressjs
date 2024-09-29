const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneDetail = require('../../../../../../models/product/accessory/accessoryDetails/HeadphoneDetail')
const AccessoryDetailMiddleware = require('../../../classes/AccessoryDetailMiddleware')

class HeadphoneDetailMiddleware extends AccessoryDetailMiddleware {

    constructor() {
        super('headphone', Headphone, HeadphoneDetail)
    }

}

module.exports = HeadphoneDetailMiddleware