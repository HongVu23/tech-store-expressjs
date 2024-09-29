const Laptop = require('../../../../../../models/product/mainProduct/mainProducts/Laptop')
const LaptopDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/LaptopDetail')
const MainProductDetailMiddleware = require('../../../classes/MainProductDetailMiddleware')

class LaptopDetailMiddleware extends MainProductDetailMiddleware {

    constructor() {
        super('laptop', Laptop, LaptopDetail)
    }

}

module.exports = LaptopDetailMiddleware