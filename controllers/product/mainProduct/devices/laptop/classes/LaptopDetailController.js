const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/LaptopVariant')
const LaptopDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/LaptopDetail')
const MainProductDetailController = require('../../../classes/MainProductDetailController')

class LaptopDetailController extends MainProductDetailController {

    constructor() {
        super('laptop', Laptop, LaptopVariant, LaptopDetail)
    }

}

module.exports = LaptopDetailController