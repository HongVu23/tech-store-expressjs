const ProductVariantController = require('../../classes/ProductVariantController')

class MainProductVariantController extends ProductVariantController {

    constructor(name, model, variantModel, detailModel) {
        super(name, model, variantModel, detailModel)
    }

}

module.exports = MainProductVariantController