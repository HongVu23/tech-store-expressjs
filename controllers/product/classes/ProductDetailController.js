const fs = require('fs')
const path = require('path')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')

class ProductDetailController {

    constructor(name, model, variantModel, detailModel) {
        this.name = name
        this.model = model
        this.variantModel = variantModel
        this.detailModel = detailModel
    }

    // get product detail
    async getProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const productDetail = await this.detailModel.findOne({ [this.name]: id }).lean().exec()

        if (!productDetail) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} detail not found` })
        }

        return res.json(productDetail)
    }

    // create new product detail
    async createNewProductDetail(req, res) {

        const id = req.params[this.name + 'Id']

        const {
            guaranteePeriod,
            includedAccessories,
            processor,
            ramMemoryAndHardDrive,
            screen,
            graphicsAndAudio,
            connectionPortAndExpansionFeature,
            sizeAndWeight,
            additionalInformation
        } = req.body

        const productDetailObj = {
            [this.name]: id,
            guaranteePeriod,
            includedAccessories,
            processor,
            ramMemoryAndHardDrive,
            screen,
            graphicsAndAudio,
            connectionPortAndExpansionFeature,
            sizeAndWeight,
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

    // update product detail
    async updateProductDetail(req, res) {

        const {
            guaranteePeriod,
            includedAccessories,
            processor,
            ramMemoryAndHardDrive,
            screen,
            graphicsAndAudio,
            connectionPortAndExpansionFeature,
            sizeAndWeight,
            additionalInformation,
            productDetail
        } = req.body

        productDetail.guaranteePeriod = guaranteePeriod
        productDetail.includedAccessories = includedAccessories
        productDetail.processor = processor
        productDetail.ramMemoryAndHardDrive = ramMemoryAndHardDrive
        productDetail.screen = screen
        productDetail.graphicsAndAudio = graphicsAndAudio
        productDetail.connectionPortAndExpansionFeature = connectionPortAndExpansionFeature
        productDetail.sizeAndWeight = sizeAndWeight
        productDetail.additionalInformation = additionalInformation

        await productDetail.save()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is updated` })
    }

    // delete product detail
    async deleteProductDetail(req, res) {

        const { productDetail } = req.body

        await productDetail.deleteOne()

        return res.json({ message: `${capitalizeFirstLetter(this.name)} detail is deleted` })
    }

    // get color images
    async getColorImages(req, res) {

        const { foundColor } = req.body

        if (!foundColor.colorImages.length) {
            return res.status(404).json({ message: 'Not have any images for this color' })
        }

        return res.json(foundColor.colorImages)
    }

    // create new color images
    async createNewColorImages(req, res, next) {

        let { product, productDetail, foundColor } = req.body
        const images = req.files

        const imagesArray = images.map(image => 
            ({ 
                imageName: image.filename,
                imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(product.name)}/${standardizeFolderNames(foundColor.color)}/color-images/${image.filename}` 
            })
        )

        foundColor.colorImages = imagesArray

        try {
            
            await productDetail.save()

        } catch (err) {
            // remember to remove all files that has been uploaded if there is an error occur while saving to the database
            for (const image of images) {
                if (fs.existsSync(image.path)) {
                    fs.unlinkSync(image.path)
                }
            }

            return next(err)
        }

        return res.json({ message: 'Color images are created' })
    }

    // update color images
    async updateColorImages(req, res, next) {

        let { product, productDetail, foundColor, updatedImages } = req.body
        const images = req.files

        if (images) {
            const imagesArray = images.map(image => 
                ({ 
                    imageName: image.filename,
                    imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(product.name)}/${standardizeFolderNames(foundColor.color)}/color-images/${image.filename}` 
                })
            )

            if (updatedImages) {
                updatedImages = JSON.parse(updatedImages)
                foundColor.colorImages = [...updatedImages, ...imagesArray]
            } else {
                foundColor.colorImages = [...foundColor.colorImages, ...imagesArray]
            }
        } else {
            if (updatedImages) {
                updatedImages = JSON.parse(updatedImages)
                foundColor.colorImages = [...updatedImages]
            }
        }

        try {
            await productDetail.save()

            // remove old images
            if (updatedImages) {
                const folderDest = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', standardizeFolderNames(product.name), standardizeFolderNames(foundColor.color), 'color-images')

                if (fs.existsSync(folderDest)) {
                    const oldImages = fs.readdirSync(folderDest)

                    const imageNames = foundColor.colorImages.map(colorImage => colorImage.imageName)

                    oldImages.forEach(image => {
                        if (!imageNames.includes(image)) {
                            const filePath = path.join(folderDest, image)

                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath)
                            }
                        }
                    })
                }
            }

        } catch (err) {
            // remember to remove all files that has been uploaded if there is an error occur while saving to the database
            for (const image of images) {
                if (fs.existsSync(image.path)) {
                    fs.unlinkSync(image.path)
                }
            }

            return next(err)
        }

        return res.json({ message: 'Color images are updated' })
    }

    // delete color images
    async deleteColorImages(req, res) {

        const { product, productDetail, foundColor } = req.body

        foundColor.colorImages = []

        await productDetail.save()

        const colorImagesFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', standardizeFolderNames(product.name), standardizeFolderNames(foundColor.color), 'color-images')

        if (fs.existsSync(colorImagesFolder)) {
            fs.rmSync(colorImagesFolder, { recursive: true, force: true })
        }

        return res.json({ message: 'Color images are deleted' })
    }

    // get highlighted images
    async getHighlightedImages(req, res) {

        const { productDetail } = req.body

        return res.json(productDetail.highlightedImages)
    }

    // create new highlighted images
    async createNewHighlightedImages(req, res, next) {

        const { product, productDetail } = req.body
        const images = req.files

        const imagesArray = images.map(image => 
            ({ 
                imageName: image.filename,
                imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(product.name)}/highlighted-images/${image.filename}` 
            })
        )

        productDetail.highlightedImages = imagesArray

        try {
            await productDetail.save()
        } catch (err) {
            // remember to remove all files that has been uploaded if there is an error occur while saving to the database
            for (const image of images) {
                if (fs.existsSync(image.path)) {
                    fs.unlinkSync(image.path)
                }
            }

            return next(err)
        }

        return res.json({ message: 'Highlighted images are created' })
    }

    // update highlighted images
    async updateHighlightedImages(req, res, next) {

        let { product, productDetail, updatedImages } = req.body
        const images = req.files

        if (images) {
            const imagesArray = images.map(image => 
                ({ 
                    imageName: image.filename,
                    imageUrl: `${process.env.SERVER_URL}/images/products/${this.name}s/${standardizeFolderNames(product.name)}/highlighted-images/${image.filename}` 
                })
            )

            if (updatedImages) {
                updatedImages = JSON.parse(updatedImages)
                productDetail.highlightedImages = [...updatedImages, ...imagesArray]
            } else {
                productDetail.highlightedImages = [...productDetail.highlightedImages, ...imagesArray]
            }
        } else {
            if (updatedImages) {
                updatedImages = JSON.parse(updatedImages)
                productDetail.highlightedImages = [...updatedImages]
            }
        }

        try {
            await productDetail.save()

            // remove old images
            if (updatedImages) {
                const folderDest = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', standardizeFolderNames(product.name), 'highlighted-images')

                if (fs.existsSync(folderDest)) {
                    const oldImages = fs.readdirSync(folderDest)

                    const imageNames = productDetail.highlightedImages.map(image => image.imageName)

                    oldImages.forEach(image => {
                        if (!imageNames.includes(image)) {
                            const filePath = path.join(folderDest, image)

                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath)
                            }
                        }
                    })
                }
            }

        } catch (err) {
            // remember to remove all files that has been uploaded if there is an error occur while saving to the database
            if (images) {
                
                for (const image of images) {
                    if (fs.existsSync(image.path)) {
                        fs.unlinkSync(image.path)
                    }
                }
            }

            return next(err)
        }

        return res.json({ message: 'Highlighted images are updated' })
    }

    // delete highlighted images
    async deleteHighlightedImages(req, res) {

        const { product, productDetail } = req.body

        productDetail.highlightedImages = []

        await productDetail.save()

        const colorImagesFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', this.name + 's', standardizeFolderNames(product.name), 'highlighted-images')

        if (fs.existsSync(colorImagesFolder)) {
            fs.rmSync(colorImagesFolder, { recursive: true, force: true })
        }

        return res.json({ message: 'Highlighted images are deleted' })
    }
}

module.exports = ProductDetailController