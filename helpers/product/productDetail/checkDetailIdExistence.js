const mongoose = require('mongoose')
const { capitalizeFirstLetter } = require('../../../utils/standardizeStr')
// check product detail id whether is exist or not
const checkDetailIdExistence = async (detailId, modelName, detailModel) => {

    if (!mongoose.Types.ObjectId.isValid(detailId)) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} detail not found` } }
    }

    let productDetail

    try {
        productDetail = await detailModel.findOne({ _id: detailId }).exec()
    } catch (err) {
        return { isValid: false, error: { message: err.message } }
    }

    if (!productDetail) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} detail not found` } }
    }

    return { isValid: true, data: productDetail }
}

module.exports = {
    checkDetailIdExistence
}