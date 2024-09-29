const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/LaptopVariant')
const MainProductController = require('../../../classes/MainProductController')

class LaptopController extends MainProductController {

    constructor() {
        super('laptop', Laptop, LaptopVariant)
    }

}

module.exports = LaptopController