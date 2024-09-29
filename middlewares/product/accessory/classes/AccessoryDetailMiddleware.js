const ProductDetailMiddleware = require('../../classes/ProductDetailMiddleware')

class AccessoryDetailMiddleware extends ProductDetailMiddleware {

    constructor(name, model, detailModel) {
        super(name, model, detailModel)
    }

    // @override
    // check required fields for create new product variant
    checkRequiredFieldsCNPD(req, res, next) {

        const {
            guaranteePeriod,
            includedAccessories,
            details
        } = req.body

        if (!guaranteePeriod || !includedAccessories || !details) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }

    // @overide
    // check whether product already has product detail
    async checkDuplicateProductDetail(req, res, next) {

        const id = req.params[this.name + 'Id']

        const duplicate = await this.detailModel.findOne({ accessory: id }).lean().exec()

        if (duplicate) {
            return res.status(409).json({ message: `Duplicate ${this.name} detail` })
        }

        next()
    }
}

module.exports = AccessoryDetailMiddleware