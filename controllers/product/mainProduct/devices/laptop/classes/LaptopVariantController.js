const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/LaptopVariant')
const LaptopDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/LaptopDetail')
const MainProductVariantController = require('../../../classes/MainProductVariantController')

class LaptopVariantController extends MainProductVariantController {

    constructor() {
        super('laptop', Laptop, LaptopVariant, LaptopDetail)
    }

}

module.exports = LaptopVariantController