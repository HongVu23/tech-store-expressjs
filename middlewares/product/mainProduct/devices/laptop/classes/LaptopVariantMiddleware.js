const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/LaptopVariant')
const MainProductVariantMiddleware = require("../../../classes/MainProductVariantMiddleware")

class LaptopVariantMiddleware extends MainProductVariantMiddleware {

    constructor() {
        super('laptop', Laptop, LaptopVariant)
    }

}

module.exports = LaptopVariantMiddleware