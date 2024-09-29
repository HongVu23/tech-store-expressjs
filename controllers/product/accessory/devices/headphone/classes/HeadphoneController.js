const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneVariant = require('../../../../../../models/product/accessory/accessoryVariants/HeadphoneVariant')
const AccessoryController = require('../../../classes/AccessoryController')

class HeadphoneController extends AccessoryController {

    constructor() {
        super('headphone', Headphone, HeadphoneVariant)
    }

}

module.exports = HeadphoneController