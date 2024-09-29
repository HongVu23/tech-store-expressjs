const SmartPhone = require('../../../../../../models/product/mainProduct/mainProducts/SmartPhone')
const SmartPhoneVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartPhoneVariant')
const SmartPhoneDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/SmartPhoneDetail')
const MainProductDetailController = require('../../../classes/MainProductDetailController')
const { capitalizeFirstLetter } = require('../../../../../../utils/standardizeStr')

class SmartPhoneDetailController extends MainProductDetailController {

    constructor() {
        super('smartPhone', SmartPhone, SmartPhoneVariant, SmartPhoneDetail)
    }

    // @override
    // create new product detail
    async createNewProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const {
            guaranteePeriod,
            includedAccessories,
            screen,
            camera,
            selfie,
            operatingSystemAndCPU,
            ramRom,
            connection,
            batteryAndCharger,
            utility,
            generalInformation
        } = req.body

        const productDetailObj = {
            [this.name]: id,
            guaranteePeriod,
            includedAccessories,
            screen,
            camera,
            selfie,
            operatingSystemAndCPU,
            ramRom,
            connection,
            batteryAndCharger,
            utility,
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
            camera,
            selfie,
            operatingSystemAndCPU,
            ramRom,
            connection,
            batteryAndCharger,
            utility,
            generalInformation,
            productDetail
        } = req.body

        productDetail.guaranteePeriod = guaranteePeriod
        productDetail.includedAccessories = includedAccessories
        productDetail.screen = screen
        productDetail.camera = camera
        productDetail.selfie = selfie
        productDetail.operatingSystemAndCPU = operatingSystemAndCPU
        productDetail.ramRom = ramRom
        productDetail.connection = connection
        productDetail.batteryAndCharger = batteryAndCharger
        productDetail.utility = utility
        productDetail.generalInformation = generalInformation

        await productDetail.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is updated` })
    }
}

module.exports = SmartPhoneDetailController