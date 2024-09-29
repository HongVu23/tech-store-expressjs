const ProductVariantMiddleware = require('../../classes/ProductVariantMiddleware')

class MainProductVariantMiddleware extends ProductVariantMiddleware {

    constructor(name, model, variantModel) {
        super(name, model, variantModel)
    }

}

module.exports = MainProductVariantMiddleware