const fs = require('fs')
const path = require('path')
const ProductInventory = require('../../../../../../models/stock/ProductInventory')
const ImportedProduct = require('../../../../../../models/stock/ImportedProduct')
const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const SmartWatchDetail = require('../../../../../../models/product/mainProduct/mainProductDetails/SmartWatchDetail')
const MainProductVariantController = require('../../../classes/MainProductVariantController')
const { capitalizeFirstLetter } = require('../../../../../../utils/standardizeStr')
const { standardizeFolderNames } = require('../../../../../../utils/standardizeNames')

class SmartWatchVariantController extends MainProductVariantController {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchVariant, SmartWatchDetail)
    }

    // @override createNewProductVariant from ProductVariantController
    // create new product variant
    async createNewProductVariant(req, res, next) {

        const id = req.params[this.name + 'Id']
        const capFirsLetterName = capitalizeFirstLetter(this.name)
        
        let { color, price, discount, quantity } = req.body

        let image

        if (req.file) {

            image = {
                imageName: req.file.originalname,
                imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(req.body.name)}/${standardizeFolderNames(color)}/${req.file.originalname}`
            }
        } else {

            image = req.body.image
        }

        price = parseInt(price)
        discount = JSON.parse(discount)

        // create new product variant
        const productVariantObject = {
            [this.name]: id,
            color,
            price,
            discount,
            image
        }

        try {
            // remember that we need to add transaction to make sure all the data is consistency if any error occur
            const productVariant = await this.variantModel.create(productVariantObject)
    
            // create product variant in the product inventory
            await ProductInventory.create({
                product: productVariant._id,
                productType: `${capFirsLetterName}Variant`,
                quantity
            })
    
            // add to the imported goods list
            await ImportedProduct.create({
                product: productVariant._id,
                productType: `${capFirsLetterName}Variant`,
                quantity
            })
    
            // add product variant color to product details if it has already existed
            const newColor = {
                color
            }
    
            await this.detailModel.findOneAndUpdate(
                { [this.name]: id },
                { $push: { colors: newColor } } // can use { new: true } option to return product details record after updated
            )
    
            return res.status(201).json({ message: `${capFirsLetterName} variant is created` })
    
        } catch (err) {
            // remove image file if have an error while save to the database
            if (req.file) {

                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path)
                }
            }
    
            next(err)
        }
    }

}

module.exports = SmartWatchVariantController