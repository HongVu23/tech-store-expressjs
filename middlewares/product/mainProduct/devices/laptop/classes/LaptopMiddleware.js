const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/LaptopVariant')
const MainProductMiddleware = require("../../../classes/MainProductMiddleware")

class LaptopMiddleware extends MainProductMiddleware {

    constructor() {
        super('laptop', Laptop, LaptopVariant)
    }

}

module.exports = LaptopMiddleware