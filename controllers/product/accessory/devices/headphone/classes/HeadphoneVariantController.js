const Headphone = require('../../../../../../models/product/accessory/accessories/Headphone')
const HeadphoneVariant = require('../../../../../../models/product/accessory/accessoryVariants/HeadphoneVariant')
const HeadphoneDetail = require('../../../../../../models/product/accessory/accessoryDetails/HeadphoneDetail')
const AccessoryVariantController = require('../../../classes/AccessoryVariantController')

class HeadphoneVariantController extends AccessoryVariantController {

    constructor() {
        super('headphone', Headphone, HeadphoneVariant, HeadphoneDetail)
    }

}

module.exports = HeadphoneVariantController