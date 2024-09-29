const mongoose = require('mongoose')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')

class ProductMiddleware {

    constructor(name, model, variantModel) {
        this.name = name
        this.model = model
        this.variantModel = variantModel
    }



    // check product id whether is exist or not
    async checkIdExistence(req, res, next) {

        const id = req.params[this.name + 'Id']

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} not found???` })
        }

        const product = await this.model.findOne({ _id: id }).exec()

        if (!product) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} not found` })
        }

        // asign product to req.body
        req.body.product = product

        next()
    }



    /* --- middleware for create new product */
    // check required fields for create new product (CNP)
    checkRequiredFieldsCNP(req, res, next) {

        const { name, brand } = req.body

        if (!name || !brand) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }

    // check for duplicate product
    async checkDuplicateProduct(req, res, next) {

        const { name } = req.body

        const duplicate = await this.model.findOne({ name }).lean().exec()

        if (duplicate) {
            return res.status(409).json({ message: `Duplicate ${this.name}` })
        }

        next()
    }
    /* middleware for create new product --- */



    /* --- middleware for update product */
    // check required fields for update product (UP)
    checkRequiredFieldsUP(req, res, next) {

        const { name, brand } = req.body

        if (!name || !brand) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }
    /* middleware for update product --- */



    /* --- middleware for delete product */
    // check whether have any variant that is exsiting for product
    async checkVariants(req, res, next) {

        const id = req.params[this.name + 'Id']

        const variants = await this.variantModel.find({ [this.name]: id }).lean().exec()

        if (variants.length) {
            return res.status(403).json({ message: `Not allowed to delete ${this.name} that have variants` })
        }

        next()
    }
    /* middleware for delete product --- */
}

module.exports = ProductMiddleware