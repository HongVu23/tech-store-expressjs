const mongoose = require('mongoose')
const multer = require('multer')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const { fileFilterCreator: fileFilterCreatorCI } = require('../../../helpers/product/productDetail/colorImage/fileFilterCreator')
const { storageCreator: storageCreatorCI } = require('../../../helpers/product/productDetail/colorImage/storageCreator')
const { fileFilterCreator: fileFilterCreatorHI } = require('../../../helpers/product/productDetail/highlightedImage/fileFilterCreator')
const { storageCreator: storageCreatorHI } = require('../../../helpers/product/productDetail/highlightedImage/storageCreator')
const { fileSizeLimiterCreator } = require('../../../helpers/uploadFile/fileSizeLimiterCreator')
const { configUploadMultiple } = require('../../../helpers/uploadFile/configUpload')

class ProductDetailMiddleware {

    constructor(name, model, detailModel) {
        this.name = name
        this.model = model
        this.detailModel = detailModel
        this.uploadForCNCI = null
        this.uploadForUCI = null
        this.uploadForCNHI = null
        this.uploadForUHI = null
    }



    // check product id whether is exist or not
    async checkIdExistence(req, res, next) {

        const id = req.params[this.name + 'Id']

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} not found` })
        }

        const product = await this.model.findOne({ _id: id }).lean().exec()

        if (!product) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} not found` })
        }

        // asign product to req.body
        req.body.product = product

        next()
    }



    // check product detail id whether is exist or not
    async checkDetailIdExistence(req, res, next) {

        const detailId = req.params[this.name + 'DetailId']

        if (!mongoose.Types.ObjectId.isValid(detailId)) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} detail not found` })
        }

        const productDetail = await this.detailModel.findOne({ _id: detailId }).exec()

        console.log({ productDetail })

        if (!productDetail) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} detail not found` })
        }

        // asign product detail to req.body
        req.body.productDetail = productDetail

        next()
    }



    /* --- middleware for create new product detail */
    // check required fields for create new product variant
    checkRequiredFieldsCNPD(req, res, next) {

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

        if (!guaranteePeriod || !includedAccessories || !processor || !ramMemoryAndHardDrive || !screen || !graphicsAndAudio || !connectionPortAndExpansionFeature || !sizeAndWeight || !additionalInformation) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        next()
    }

    // check whether product already has product detail
    async checkDuplicateProductDetail(req, res, next) {

        const id = req.params[this.name + 'Id']

        const duplicate = await this.detailModel.findOne({ [this.name]: id }).lean().exec()

        if (duplicate) {
            return res.status(409).json({ message: `Duplicate ${this.name} detail` })
        }

        next()
    }
    /* middleware for create new product detail --- */



    /* --- middleware for update product detail */
    // check required fields for update product detail
    checkRequiredFieldsUPD(req, res, next) {

        this.checkRequiredFieldsCNPD(req, res, next)

    }
    /* middleware for update product detail --- */



    /* ------ middleware for color images */
    // check whether color is sent or not (required field)
    checkRequiredColor(req, res, next) {

        const { color } = req.body

        if (!color) {
            return res.status(400).json({ message: 'Color is required' })
        }

        next()
    }

    // check whether color is exist or not
    checkColorExistence(req, res, next) {

        const { color, productDetail } = req.body

        // check for the color if it is exist in the products or not
        let foundColor
        for (const colorObj of productDetail.colors) {
            if (colorObj.color === color) {
                foundColor = colorObj
                break
            }
        }

        if (!foundColor) {
            return res.status(404).json({ message: 'Color not found' })
        }

        // asign found color to req.body
        req.body.foundColor = foundColor

        next()
    }

    // check whether color already have images
    checkImagesExistence(req, res, next) {

        const { foundColor } = req.body

        if (!foundColor.colorImages.length) {
            return res.status(404).json({ message: 'There are no images for color' })
        }

        next()
    }


    /* --- middleware for create new color images */
    // config for upload image and validate data for create new color images
    setUploadForCNCI() {

        const storage = storageCreatorCI(this.name)

        const fileFilter = fileFilterCreatorCI('create', this.name, this.model, this.detailModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForCNCI = configUploadMultiple(storage, fileFilter, fileSizeLimiter, 'images', 10)
    }

    // upload file and validation for create new color images
    checkForCNCI(req, res, next) {
        console.log('CNCI middleware')

        this.uploadForCNCI(req, res, (err) => {
            console.log('uploadForCNCI')

            if (err instanceof multer.MulterError) {
                // error related to multer
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message == `${capitalizeFirstLetter(this.name)} detail not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === 'Color is required') {
                    return res.status(400).json({ message: err.message })
                } else if (err.message === 'Color not found') {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'Color already have images') {
                    return res.status(409).json({ message: err.message })
                } else {
                    return next(err)
                }
            }

            if (!req?.files?.length) {
                return res.status(400).json({ message: 'All fields are required' })
            }

            next()
        })

    }
    /* middleware for create new color images --- */


    /* --- middleware for update color images */
    // check whether removed images is valid or not
    checkValidImages(req, res, next) {

        // check whether updated images is valid or if it is sent
        let { updatedImages, foundColor } = req.body

        if (updatedImages) {

            try {
                updatedImages = JSON.parse(updatedImages)
            } catch (err) {
                return cb(new Error(err.message))
            }

            for (const image of updatedImages) {

                let isValid = false
                
                for (const colorImage of foundColor.colorImages) {

                    if (colorImage.imageName === image.imageName && colorImage.imageUrl === image.imageUrl) {
                        isValid = true
                        break
                    }
                }

                if (!isValid) {
                    return res.status(400).json({ message: 'Invalid image are found' })
                }
            }

            // 'Invalid number of image are found'
            for (let i = 0; i < updatedImages.length - 1; i++) {

                for (let j = i; j < updatedImages.length; i++) {
                    if (updatedImages[i].imageName === updatedImages[j].imageName && updatedImages[i].imageUrl === updatedImages[j].imageUrl) {
                        return res.status(400).json({ message: 'Invalid number of image are found' })
                    }
                }
            }
        }

        next()
    }

    // config for upload image and validate data for update color images
    setUploadForUCI() {

        const storage = storageCreatorCI(this.name)

        const fileFilter = fileFilterCreatorCI('update', this.name, this.model, this.detailModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForUCI = configUploadMultiple(storage, fileFilter, fileSizeLimiter, 'images', 10)
    }

    // upload file and validation for update color images
    checkForUCI(req, res, next) {
        console.log('UCI middleware')

        this.uploadForUCI(req, res, (err) => {
            console.log('uploadForUCI')

            if (err instanceof multer.MulterError) {
                // error related to multer
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message == `${capitalizeFirstLetter(this.name)} detail not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === 'Color is required') {
                    return res.status(400).json({ message: err.message })
                } else if (err.message === 'Color not found') {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'There are no images for color') {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === 'Invalid image are found') {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'Invalid number of image are found') {
                    return res.status(403).json({ message: err.message })
                }
                else {
                    return next(err)
                }
            }

            next()
        })

    }
    /* middleware for update color images --- */
    /* middleware for color images ------ */



    /* ------ middleware for highlighted images */
    // check whether highlighted images is exist or not
    checkHlImagesExistence(req, res, next) {

        const { productDetail } = req.body

        if (!productDetail.highlightedImages.length) {
            return res.status(404).json({ message: 'Highlighted images not found' })
        }

        next()
    }


    /* --- middleware for create new highlighted images */
    // check whether removed images is valid or not
    checkValidHlImages(req, res, next) {

        // check whether updated images is valid or if it is sent
        let { updatedImages, productDetail } = req.body

        if (updatedImages) {

            try {
                updatedImages = JSON.parse(updatedImages)
            } catch (err) {
                return cb(new Error(err.message))
            }

            for (const image of updatedImages) {

                let isValid = false
                
                for (const highlightedImage of productDetail.highlightedImages) {

                    if (highlightedImage.imageName === image.imageName && highlightedImage.imageUrl === image.imageUrl) {
                        isValid = true
                        break
                    }
                }

                if (!isValid) {
                    return res.status(400).json({ message: 'Invalid image are found' })
                }
            }

            // 'Invalid number of image are found'
            for (let i = 0; i < updatedImages.length - 1; i++) {

                for (let j = i + 1; j < updatedImages.length; j++) {
                    if (updatedImages[i].imageName === updatedImages[j].imageName && updatedImages[i].imageUrl === updatedImages[j].imageUrl) {
                        return res.status(400).json({ message: 'Invalid number of image are found' })
                    }
                }
            }
        }

        next()
    }


    // config for upload image and validate data for create new highlighted images
    setUploadForCNHI() {

        const storage = storageCreatorHI(this.name)

        const fileFilter = fileFilterCreatorHI('create', this.name, this.model, this.detailModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForCNHI = configUploadMultiple(storage, fileFilter, fileSizeLimiter, 'images', 10)
    }

    // upload file and validation for create new highlighted images
    checkForCNHI(req, res, next) {

        this.uploadForCNHI(req, res, (err) => {

            if (err instanceof multer.MulterError) {
                // error related to multer
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} detail not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === 'Highlighted images are already exist') {
                    return res.status(409).json({ message: err.message })
                } else {
                    return next(err)
                }
            }

            if (!req?.files.length) {
                return res.status(400).json({ message: 'All fields are required' })
            }

            next()
        })

    }
    /* middleware for create new highlighted images --- */

    /* --- middleware for create new highlighted images */
    // config for upload image and validate data for update highlighted images
    setUploadForUHI() {

        const storage = storageCreatorHI(this.name)

        const fileFilter = fileFilterCreatorHI('update', this.name, this.model, this.detailModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForUHI = configUploadMultiple(storage, fileFilter, fileSizeLimiter, 'images', 10)
    }

    // upload file and validation for update highlighted images
    checkForUHI(req, res, next) {

        this.uploadForUHI(req, res, (err) => {

            if (err instanceof multer.MulterError) {
                // error related to multer
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} detail not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === 'Highlighted images not found') {
                    return res.status(409).json({ message: err.message })
                } else if (err.message === 'Invalid image are found') {
                    return res.status(403).json({ message: err.message })
                } else if (err.message == 'Invalid number of image are found') {
                    return res.status(403).json({ message: err.message })
                } else {
                    return next(err)
                }
            }

            next()
        })
    }
    /* middleware for create new highlighted images --- */
    /* middleware for highlighted images ------ */
}

module.exports = ProductDetailMiddleware