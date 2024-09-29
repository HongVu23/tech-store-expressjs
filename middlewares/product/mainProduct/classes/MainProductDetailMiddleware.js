const ProductDetailMiddleware = require('../../classes/ProductDetailMiddleware')

class MainProductDetailMiddleware extends ProductDetailMiddleware {

    constructor(name, model, detailModel) {
        super(name, model, detailModel)
    }

}

module.exports = MainProductDetailMiddleware