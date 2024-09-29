const Tablet = require('../../../../../../models/product/mainProduct/mainProducts/Tablet')
const TabletVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/TabletVariant')
const TabletDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/TabletDetail')
const MainProductDetailController = require('../../../classes/MainProductDetailController')
const { capitalizeFirstLetter } = require('../../../../../../utils/standardizeStr')

class TabletDetailController extends MainProductDetailController {

    constructor() {
        super('tablet', Tablet, TabletVariant, TabletDetail)
    }

    // @override
    // create new product detail
    async createNewProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            operatingSystemAndCPU,
            ramRom,
            camera,
            selfie,
            connection,
            utility,
            batteryAndCharger,
            generalInformation
        } = req.body

        const productDetailObj = {
            [this.name]: id,
            guaranteePeriod,
            includedAccessories,
            screen,
            operatingSystemAndCPU,
            ramRom,
            camera,
            selfie,
            connection,
            utility,
            batteryAndCharger,
            generalInformation
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
            operatingSystemAndCPU,
            ramRom,
            camera,
            selfie,
            connection,
            utility,
            batteryAndCharger,
            generalInformation,
            productDetail
        } = req.body

        productDetail.guaranteePeriod = guaranteePeriod
        productDetail.includedAccessories = includedAccessories
        productDetail.screen = screen
        productDetail.operatingSystemAndCPU = operatingSystemAndCPU
        productDetail.ramRom = ramRom
        productDetail.camera = camera
        productDetail.selfie = selfie
        productDetail.connection = connection
        productDetail.utility = utility
        productDetail.batteryAndCharger = batteryAndCharger
        productDetail.generalInformation = generalInformation

        await productDetail.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is updated` })
    }
}

module.exports = TabletDetailController