const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneVariant = require('../../../../../../models/product/accessory/accessoryVariants/HeadphoneVariant')
const HeadphoneDetail = require('../../../../../../models/product/accessory/accessoryDetails/HeadphoneDetail')
const AccessoryDetailController = require('../../../classes/AccessoryDetailController')

class HeadphoneDetailController extends AccessoryDetailController {

    constructor() {
        super('headphone', Headphone, HeadphoneVariant, HeadphoneDetail)
    }

}

module.exports = HeadphoneDetailController