const ProductMiddleware = require('../../classes/ProductMiddleware')

class AccessoryMiddleware extends ProductMiddleware {

    constructor(name, model, variantModel) {
        super(name, model, variantModel)
    }

}

module.exports = AccessoryMiddleware