const ProductDetailController = require('../../classes/ProductDetailController')

class MainProductDetailController extends ProductDetailController {

    constructor(name, model, variantModel, detailModel) {
        super(name, model, variantModel, detailModel)
    }

}

module.exports = MainProductDetailController