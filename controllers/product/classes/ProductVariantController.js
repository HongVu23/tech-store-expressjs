const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const ProductInventory = require('../../../models/stock/ProductInventory')
const ImportedProduct = require('../../../models/stock/ImportedProduct')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')

class ProductVariantController {

    constructor(name, model, variantModel, detailModel) {
        this.name = name
        this.model = model
        this.variantModel = variantModel
        this.detailModel = detailModel
    }

    // get all product variants
    async getAllProductVariants(req, res) {

        const id = req.params[this.name + 'Id']

        const productVariants = await this.variantModel.find({ [this.name]: id }).lean().exec()

        if (!productVariants.length) {
            return res.status(404).json({ message: `No ${this.name} variants found` })
        }

        // product variant id array
        const productVariantIds = productVariants.map(productVariant => productVariant._id)

        const productInventory = await ProductInventory.find({ product: { $in: productVariantIds } }).lean().exec()

        // normalizing data
        const normalizedProductInventory = {}

        for (const productInvent of productInventory) {
            normalizedProductInventory[productInvent.product] = { quantity: productInvent.quantity }
        }

        // server product variants
        const servedProductVariants = productVariants.map((productVariant) => {

            const id = productVariant._id.toString()

            return {
                ...productVariant,
                quantity: normalizedProductInventory[id].quantity
            }
        })

        return res.json(servedProductVariants)
    }

    // create new product variant
    async createNewProductVariant(req, res, next) {

        const id = req.params[this.name + 'Id']
        const capFirsLetterName = capitalizeFirstLetter(this.name)

        let { ram, hardDrive, color, price, discount, quantity } = req.body

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
            ram,
            hardDrive,
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

                if (fs.existsSync(req.file.destination)) {
                    fs.rmdirSync(req.file.destination)
                }
            }

            next(err)
        }
    }

    // update product variant
    async updateProductVariant(req, res, next) {

        let { productVariant, price, discount, status } = req.body

        let image

        if (req.file) {
            image = {
                imageName: req.file.originalname,
                imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(req.body.name)}/${standardizeFolderNames(productVariant.color)}/${req.file.originalname}`
            }
        } else {
            image = productVariant.image
        }

        price = parseInt(price)
        discount = JSON.parse(discount)

        // asign old image to remove after save product variant
        const oldImage = productVariant.image.imageName

        productVariant.price = price
        productVariant.discount = discount
        productVariant.image = image
        productVariant.status = status

        try {
            await productVariant.save()

            if (req.file) {

                if (image.imageName !== oldImage) {

                    const folderName = standardizeFolderNames(req.body.name)
                    const folderColor = standardizeFolderNames(productVariant.color)

                    // find and remove the old image
                    const fileDest = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', folderName, folderColor, oldImage)

                    if (fs.existsSync(fileDest)) {
                        fs.unlinkSync(fileDest)
                    }
                }
            }

            // find products that has the same color to update image
            const sameColorProducts = await this.variantModel.find({ [this.name]: productVariant[this.name], color: productVariant.color }).exec()

            for (const sameColorProduct of sameColorProducts) {
                sameColorProduct.image.imageName = productVariant.image.imageName
                sameColorProduct.image.imageUrl = productVariant.image.imageUrl
                await sameColorProduct.save()
            }

        } catch (err) {
            // remove image file if have an error while save to the database
            if (req.file) {
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path)
                }
            }

            next(err)
        }

        return res.json({ message: `${capitalizeFirstLetter(this.name)} variant is updated` })

    }

    // delete product variant
    async deleteProductVariant(req, res) {

        const { productVariant } = req.body
        const folderName = standardizeFolderNames(req.body.product.name)
        const folderColor = standardizeFolderNames(productVariant.color)

        // remove in the product inventory
        const productInventory = await ProductInventory.findOne({ product: productVariant._id }).exec()

        await productInventory.deleteOne()

        await productVariant.deleteOne()

        // check whether have this variant color in product variants
        const duplicateColor = await this.variantModel.findOne({ color: productVariant.color }).lean().exec()

        if (!duplicateColor) {
            // romve image in file system
            const fileDest = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', folderName, folderColor)

            if (fs.existsSync(fileDest)) {
                fs.rmSync(fileDest, { recursive: true, force: true })
            }
        }

        return res.json({ message: `${capitalizeFirstLetter(this.name)} variant is deleted` })
    }

    // get product variant
    async getProductVariant(req, res) {

        let { productVariant } = req.body

        const productInventory = await ProductInventory.findOne({ product: productVariant._id }).lean().exec()

        productVariant = productVariant.toObject()
        productVariant = { ...productVariant, quantity: productInventory.quantity }

        return res.json(productVariant)
    }
}

module.exports = ProductVariantController