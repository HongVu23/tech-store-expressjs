const mongoose = require('mongoose')
const { capitalizeFirstLetter } = require('../../utils/standardizeStr')

// check id existence
const checkIdExistence = async (id, modelName, model) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} not found` } }
    }

    let product

    try {
        product = await model.findOne({ _id: id }).lean().exec()
    } catch (error) {
        return { isValid: false, error: { message: error.message } }
    }

    if (!product) {
        return { isValid: false, error: { message: `${capitalizeFirstLetter(modelName)} not found` } }
    }

    return { isValid: true, data: product }
}

module.exports = {
    checkIdExistence
}