const mongoose = require('mongoose')
const path = require('path')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
const { checkFileExt } = require('../../uploadFile/checkFileExt')
const { checkIdExistence } = require('../checkIdExistence')

// check variant id whether is exist or not
const checkVariantIdExistence = async (variantId, modelName, variantModel) => {

    if (!mongoose.Types.ObjectId.isValid(variantId)) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} variant not found` } }
    }

    let productVariant

    try {
        productVariant = await variantModel.findOne({ _id: variantId }).exec()
    } catch (error) {
        return { isValid: false, error: { message: error.message } }
    }

    if (!productVariant) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} variant not found` } }
    }

    return { isValid: true, data: productVariant }
}

module.exports = {
    checkFileExt,
    checkIdExistence,
    checkVariantIdExistence
}