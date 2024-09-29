const ProductMiddleware = require('../../classes/ProductMiddleware')

class MainProductMiddleware extends ProductMiddleware {

    constructor(name, model, variantModel) {
        super(name, model, variantModel)
    }

}

module.exports = MainProductMiddleware