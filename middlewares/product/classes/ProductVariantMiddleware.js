const mongoose = require('mongoose')
const multer = require('multer')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const {
    checkFileExt,
    checkIdExistence,
    checkVariantIdExistence
} = require('../../../helpers/product/productVariant/fileFilterCreator')
const { storageCreator } = require('../../../helpers/product/productVariant/storageCreator')
const { fileSizeLimiterCreator } = require('../../../helpers/uploadFile/fileSizeLimiterCreator')
const { configUploadSingle } = require('../../../helpers/uploadFile/configUpload')

class ProductVariantMiddleware {

    constructor(name, model, variantModel) {
        this.name = name
        this.model = model
        this.variantModel = variantModel
        this.uploadForCNPV = null
        this.uploadForUPV = null
    }



    // check product id whether is exist or not
    async checkIdExistence(req, res, next) {

        const id = req.params[this.name + 'Id']

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("???")
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



    // check product variant id whether is exist or not
    async checkVariantIdExistence(req, res, next) {

        const variantId = req.params[this.name + 'VariantId']

        if (!mongoose.Types.ObjectId.isValid(variantId)) {
            console.log(52, variantId)
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} variant not found` })
        }

        const productVariant = await this.variantModel.findOne({ _id: variantId }).exec()

        if (!productVariant) {
            return res.status(404).json({ message: `${capitalizeFirstLetter(this.name)} variant not found` })
        }

        // asign product variant to req.body
        req.body.productVariant = productVariant

        next()
    }



    /* --- file filter creator */
    // check all required fields function for file filter creator
    checkAllRequiredFields(fields, actionType) {

        let { ram, hardDrive, color, price, discount, quantity, status } = fields

        if (actionType === 'update') {

            if (ram || hardDrive || color || quantity) {
                return { isValid: false, error: { message: 'Updating ram, hardDrive, color or quantity field is not allowed' } }
            }

            if (!price || !discount || status == null || status == undefined) {
                return { isValid: false, error: { message: 'All fields are required' } }
            }

            // check whether discount is valid or not
            const tmpDiscount = JSON.parse(discount)

            // check whether discountPercentage = 0 or not. If equal to 0 then check whether has discountEndDate from discount
            if (tmpDiscount.discountPercentage === 0) {

                if (tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time not allowed when discount percentage is 0' })
                }
            } else {

                if (!tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time is required' })
                }

                if (new Date() > tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time must be in the future' })
                }
            }
        }

        if (actionType === 'create') {

            quantity = parseInt(quantity)

            if (!ram || !hardDrive || !color || !price || !discount || !quantity) {
                return { isValid: false, error: { message: 'All fields are required' } }
            }

            // check whether discount is valid or not
            const tmpDiscount = JSON.parse(discount)

            // check whether discountPercentage = 0 or not. If equal to 0 then check whether has discountEndDate from discount
            if (tmpDiscount.discountPercentage === 0) {

                if (tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time not allowed when discount percentage is 0' })
                }
            } else {

                if (!tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time is required' })
                }

                if (new Date() > tmpDiscount.discountEndDate) {
                    return res.status(400).json({ message: 'Discount end time must be in the future' })
                }
            }
        }

        return { isValid: true }
    }

    // check duplicate product function for file filter creator
    async checkDuplicateProduct(fields, modelName, variantModel) {

        const { id, ram, hardDrive, color } = fields

        let duplicate

        try {
            duplicate = await variantModel.findOne({ [modelName]: id, ram, hardDrive, color }).lean().exec()
        } catch (error) {
            return { isValid: false, error: { message: error.message } }
        }

        if (duplicate) {
            return { isValid: false, error: { message: `Duplicate ${modelName} variant` } }
        }

        return { isValid: true }
    }

    // file filter creator
    fileFilterCreator(actionType, modelName, model, variantModel) {

        const checkAllRequiredFields = this.checkAllRequiredFields
        const checkDuplicateProduct = this.checkDuplicateProduct

        const fileFilter = async (req, file, cb) => {

            const id = req.params[modelName + 'Id']
            const variantId = req.params[modelName + 'VariantId']
            const { ram, hardDrive, color, price, discount, quantity, status } = req.body

            const checkFileExtResult = checkFileExt(file.originalname)

            if (!checkFileExtResult.isValid) {
                return cb(new Error(checkFileExtResult.error.message))
            }

            const checkAllRequiredFieldsResult = checkAllRequiredFields({ ram, hardDrive, color, price, discount, quantity, status }, actionType)

            if (!checkAllRequiredFieldsResult.isValid) {
                return cb(new Error(checkAllRequiredFieldsResult.error.message))
            }

            const checkIdExistenceResult = await checkIdExistence(id, modelName, model)

            if (!checkIdExistenceResult.isValid) {
                return cb(new Error(checkIdExistenceResult.error.message))
            }

            if (actionType === 'create') {
                const checkDuplicateProductResult = await checkDuplicateProduct({ id, ram, hardDrive, color }, modelName, variantModel)

                if (!checkDuplicateProductResult.isValid) {
                    return cb(new Error(checkDuplicateProductResult.error.message))
                }

                const duplicateColor = await this.variantModel.findOne({ [modelName]: id, color }).lean().exec()

                if (duplicateColor) {
                    return cb(new Error('Color already has image. Do not need to send image'))
                }
            }

            if (actionType === 'update') {
                const checkVariantIdExistenceResult = await checkVariantIdExistence(variantId, modelName, variantModel)

                if (!checkVariantIdExistenceResult.isValid) {
                    return cb(new Error(checkVariantIdExistenceResult.error.message))
                } else {
                    // asign productVariant to req.body
                    req.body.productVariant = checkVariantIdExistenceResult.data
                }
            }

            // asign name to req.body
            req.body.name = checkIdExistenceResult.data.name

            return cb(null, true)
        }

        return fileFilter
    }
    /* file filter creator --- */



    /* --- middleware for create new product variant */
    // check all required field - for create new product variant
    checkRequiredFieldsCNPV(req, res, next) {

        let { ram, hardDrive, color, price, discount, quantity } = req.body
        quantity = parseInt(quantity)

        if (!ram || !hardDrive || !color || !price || !discount || !quantity) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // check whether discount is valid or not
        const tmpDiscount = JSON.parse(discount)

        // check whether discountPercentage = 0 or not. If equal to 0 then check whether has discountEndDate from discount
        if (tmpDiscount.discountPercentage === 0) {

            if (tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time not allowed when discount percentage is 0' })
            }
        } else {

            if (!tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time is required' })
            }

            if (new Date() > tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time must be in the future' })
            }
        }

        return next()
    }

    // check duplicate product variant - for create new product variant
    async checkDuplicateCNPV(req, res, next) {

        const id = req.params[this.name + 'Id']

        const { ram, hardDrive, color } = req.body

        const duplicate = await this.variantModel.findOne({ [this.name]: id, ram, hardDrive, color }).lean().exec()

        if (duplicate) {
            return res.status(409).json({ message: `Duplicate ${this.name} variant` })
        }

        return next()
    }

    // check duplicate color - for create new product variant (if don't have color, client must send imgae)
    async checkDuplicateColor(req, res, next) {

        if (req.file) {
            return next()
        }

        const id = req.params[this.name + 'Id']
        const { color } = req.body

        const duplicateColor = await this.variantModel.findOne({ [this.name]: id, color }).lean().exec()

        if (!duplicateColor) {
            return res.status(400).json({ message: 'Image is required' })
        }

        // asign image to req.body
        req.body.image = duplicateColor.image

        return next()
    }

    // configure for upload image and validate data for create new product variant
    setUploadForCNPV() {

        const storage = storageCreator(this.name)

        const fileFilter = this.fileFilterCreator('create', this.name, this.model, this.variantModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForCNPV = configUploadSingle(storage, fileFilter, fileSizeLimiter, 'image')
    }

    // upload file and validation for create new product variant
    checkForCNPV(req, res, next) {

        this.uploadForCNPV(req, res, async (err) => {

            if (err instanceof multer.MulterError) {
                // error related to multer error
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'All fields are required') {
                    return res.status(400).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === `Duplicate ${this.name} variant`) {
                    return res.status(409).json({ message: err.message })
                } else if (err.message === 'Color already has image. Do not need to send image') {
                    return res.status(409).json({ message: err.message })
                } else {
                    return next(err)
                }
            }

            next()
        })
    }
    /* middleware for create new product variant --- */



    /* --- middleware for update product variant */
    // check required fields for update product variant
    checkRequiredFieldsUPV(req, res, next) {

        const { ram, hardDrive, color, price, discount, quantity, status } = req.body
        
        if (ram || hardDrive || color || quantity) {
            return res.status(403).json({ message: 'Updating ram, hardDrive, color or quantity field is not allowed' })
        }

        if (!price || !discount || status == null || status == undefined) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // check whether discount is valid or not
        const tmpDiscount = JSON.parse(discount)

        // check whether discountPercentage = 0 or not. If equal to 0 then check whether has discountEndDate from discount
        if (tmpDiscount.discountPercentage === 0) {

            if (tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time not allowed when discount percentage is 0' })
            }
        } else {

            if (!tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time is required' })
            }

            if (new Date() > tmpDiscount.discountEndDate) {
                return res.status(400).json({ message: 'Discount end time must be in the future' })
            }
        }

        return next()
    }

    // config for upload image and validate data for update product variant
    setUploadForUPV() {
        const storage = storageCreator(this.name)

        const fileFilter = this.fileFilterCreator('update', this.name, this.model, this.variantModel)

        const fileSizeLimiter = fileSizeLimiterCreator(1024 * 1024 * 5) // 5 MB

        this.uploadForUPV = configUploadSingle(storage, fileFilter, fileSizeLimiter, 'image')
    }

    // upload file and validation for update product variant
    checkForUPV(req, res, next) {

        this.uploadForUPV(req, res, (err) => {

            if (err instanceof multer.MulterError) {
                // error related to multer error
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(413).json({ message: 'File size exceeds the allowed limit of 5MB' })
                } else {
                    return res.status(500).json({ message: err + '. Upload failed due to multer error' })
                }
            } else if (err) {
                if (err.message === "Only '.jpg', '.jpeg' and '.png' file extension are allowed") {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'Updating ram, hardDrive, color or quantity field is not allowed') {
                    return res.status(403).json({ message: err.message })
                } else if (err.message === 'All fields are required') {
                    return res.status(400).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} not found`) {
                    return res.status(404).json({ message: err.message })
                } else if (err.message === `${capitalizeFirstLetter(this.name)} variant not found`) {
                    return res.status(404).json({ message: err.message })
                } else {
                    return next(err)
                }
            }

            next()
        })
    }
    /* middleware for update product variant --- */



    /* --- middleware for delete product variant */
    // check whether state is active or not
    checkState(req, res, next) {

        const { productVariant } = req.body

        if (productVariant.status) {
            return res.status(403).json({ message: `Not allowed to delete active ${this.name} variant` })
        }

        next()
    }
    /* middleware for delete product variant --- */
}

module.exports = ProductVariantMiddleware