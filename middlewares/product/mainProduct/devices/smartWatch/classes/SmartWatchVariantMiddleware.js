const multer = require('multer')
const SmartWatch = require('../../../../../../models/product/mainProduct/mainProducts/SmartWatch')
const SmartWatchVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/SmartWatchVariant')
const MainProductVariantMiddleware = require("../../../classes/MainProductVariantMiddleware")
const {
    checkFileExt,
    checkIdExistence,
    checkVariantIdExistence
} = require('../../../../../../helpers/product/productVariant/fileFilterCreator')
const { capitalizeFirstLetter } = require('../../../../../../utils/standardizeStr')

class SmartWatchVariantMiddleware extends MainProductVariantMiddleware {

    constructor() {
        super('smartWatch', SmartWatch, SmartWatchVariant)
    }



    /* --- file filter creator */
    // @override
    // check all required fields function for file filter creator
    checkAllRequiredFields(fields, actionType) {

        let { color, price, discount, quantity } = fields

        if (actionType === 'update') {

            if (color || quantity) {
                return { isValid: false, error: { message: 'Updating color or quantity field is not allowed' } }
            }

            if (!price || !discount) {
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

            if (!color || !price || !discount || !quantity) {
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

    // @override
    // check duplicate product function for file filter creator
    async checkDuplicateProduct(fields, modelName, variantModel) {

        const { id, color } = fields

        let duplicate

        try {
            duplicate = await variantModel.findOne({ [modelName]: id, color }).lean().exec()
        } catch (error) {
            return { isValid: false, error: { message: error.message } }
        }

        if (duplicate) {
            return { isValid: false, error: { message: `Duplicate ${modelName} variant` } }
        }

        return { isValid: true }
    }

    // @override
    // file filter creator
    fileFilterCreator(actionType, modelName, model, variantModel) {

        const checkAllRequiredFields = this.checkAllRequiredFields
        const checkDuplicateProduct = this.checkDuplicateProduct

        const fileFilter = async (req, file, cb) => {

            const id = req.params[modelName + 'Id']
            const variantId = req.params[modelName + 'VariantId']
            const { color, price, discount, quantity } = req.body

            const checkFileExtResult = checkFileExt(file.originalname)

            if (!checkFileExtResult.isValid) {
                return cb(new Error(checkFileExtResult.error.message))
            }

            const checkAllRequiredFieldsResult = checkAllRequiredFields({ color, price, discount, quantity }, actionType)

            if (!checkAllRequiredFieldsResult.isValid) {
                return cb(new Error(checkAllRequiredFieldsResult.error.message))
            }

            const checkIdExistenceResult = await checkIdExistence(id, modelName, model)

            if (!checkIdExistenceResult.isValid) {
                return cb(new Error(checkIdExistenceResult.error.message))
            }

            if (actionType === 'create') {
                const checkDuplicateProductResult = await checkDuplicateProduct({ id, color }, modelName, variantModel)

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

            // asign value for checked funcs to req.body
            req.body.isCheckAllRequiredFields = true
            req.body.isCheckDuplicateProduct = true
            req.body.isCheckDuplicateColor = true
            req.body.isCheckDuplicateColor = true

            // asign name to req.body
            req.body.name = checkIdExistenceResult.data.name

            return cb(null, true)
        }

        return fileFilter
    }
    /* file filter creator --- */


    // upload file and validation for update product variant
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



    // @override
    // check all required field - for create new product variant
    checkRequiredFieldsCNPV(req, res, next) {

        if (req.body.isCheckAllRequiredFields) {
            return next()
        }

        let { color, price, discount, quantity } = req.body
        quantity = parseInt(quantity)

        if (!color || !price || !discount || !quantity) {
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

    // @override
    // check duplicate product variant - for create new product variant
    async checkDuplicateCNPV(req, res, next) {

        if (req.body.isCheckDuplicateProduct) {
            return next()
        }

        const id = req.params[this.name + 'Id']

        const { color } = req.body

        const duplicate = await this.variantModel.findOne({ [this.name]: id, color }).lean().exec()

        if (duplicate) {
            return res.status(409).json({ message: `Duplicate ${this.name} variant` })
        }

        return next()
    }

    // @override
    // check required fields for update product variant
    checkRequiredFieldsUPV(req, res, next) {

        if (req.body.isCheckAllRequiredFields) {
            return next()
        }

        const { color, price, discount, quantity } = req.body

        if (color || quantity) {
            return res.status(403).json({ message: 'Updating color or quantity field is not allowed' })
        }

        if (!price || !discount) {
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
}

module.exports = SmartWatchVariantMiddleware