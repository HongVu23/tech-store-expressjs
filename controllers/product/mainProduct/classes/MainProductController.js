const ProductController = require('../../classes/ProductController')

class MainProductController extends ProductController {

    constructor(name, model, variantModel) {
        super(name, model, variantModel)
    }

}

module.exports = MainProductController