const ProductDetailController = require('../../classes/ProductDetailController')
const { capitalizeFirstLetter } = require('../../../../utils/standardizeStr')

class AccessoryDetailController extends ProductDetailController {

    constructor(name, model, variantModel, detailModel) {
        super(name, model, variantModel, detailModel)
    }

    // @override
    // create new product detail
    async createNewProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const {
            guaranteePeriod,
            includedAccessories,
            details
        } = req.body

        const productDetailObj = {
            [this.name]: id,
            guaranteePeriod,
            includedAccessories,
            details
        }

        // add colors for this product's variants contain
        const variantColors = await this.variantModel.distinct('color').exec()

        if (variantColors) {
            // empty array
            let colorsArr = []

            variantColors.forEach(color => {
                const colorObj = { color }

                colorsArr.push(colorObj)
            })

            // asign to newProductDetails
            productDetailObj.colors = colorsArr
        }

        await this.detailModel.create(productDetailObj)

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is created` })
    }

    // @override
    // update product detail
    async updateProductDetail(req, res) {

        const {
            guaranteePeriod,
            includedAccessories,
            details,
            productDetail
        } = req.body

        productDetail.guaranteePeriod = guaranteePeriod
        productDetail.includedAccessories = includedAccessories
        productDetail.details = details

        await productDetail.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is updated` })
    }
}

module.exports = AccessoryDetailController