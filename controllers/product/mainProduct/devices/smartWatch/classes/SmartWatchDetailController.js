const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const SmartWatchDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/SmartWatchDetail')
const MainProductDetailController = require('../../../classes/MainProductDetailController')
const { capitalizeFirstLetter } = require('../../../../../../utils/standardizeStr')

class SmartWatchDetailController extends MainProductDetailController {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchVariant, SmartWatchDetail)
    }

    // @override
    // create new product detail
    async createNewProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            design,
            utility,
            battery,
            configurationAndConnection,
            additionalInformation
        } = req.body

        const productDetailObj = {
            [this.name]: id,
            guaranteePeriod,
            includedAccessories,
            screen,
            design,
            utility,
            battery,
            configurationAndConnection,
            additionalInformation
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
            screen,
            design,
            utility,
            battery,
            configurationAndConnection,
            additionalInformation,
            productDetail
        } = req.body

        productDetail.guaranteePeriod = guaranteePeriod
        productDetail.includedAccessories = includedAccessories
        productDetail.screen = screen
        productDetail.design = design
        productDetail.utility = utility
        productDetail.battery = battery
        productDetail.configurationAndConnection = configurationAndConnection
        productDetail.additionalInformation = additionalInformation

        await productDetail.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is updated` })
    }
}

module.exports = SmartWatchDetailController