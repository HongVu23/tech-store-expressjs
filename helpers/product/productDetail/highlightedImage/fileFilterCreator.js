const mongoose = require('mongoose')
const { capitalizeFirstLetter } = require('../../../../utils/standardizeStr')
const { checkFileExt } = require('../../../uploadFile/checkFileExt')
const { checkIdExistence } = require('../../checkIdExistence')
const { checkDetailIdExistence } = require('../checkDetailIdExistence')
const { isValid } = require('date-fns')

const checkHlImagesExistence = (productDetail, actionType) => {

    if (actionType === 'create') {
        if (productDetail.highlightedImages.length) {
            return { isValid: false, error: { message: 'Highlighted images are already exist' } }
        } 
    }

    if (actionType === 'update') {
        if (!productDetail.highlightedImages.length) {
            return { isValid: false, error: { message: 'Highlighted images not found' } }
        } 
    }

    return { isValid: true }
}

const fileFilterCreator = (actionType, modelName, model, detailModel) => {

    const fileFilter = async (req, file, cb) => {

        const id = req.params[modelName + 'Id']
        const detailId = req.params[modelName + 'DetailId']

        const checkFileExtResult = checkFileExt(file.originalname)

        if (!checkFileExtResult.isValid) {
            return cb(new Error(checkFileExtResult.error.message))
        }

        const checkIdExistenceResult = await checkIdExistence(id, modelName, model)

        if (!checkIdExistenceResult.isValid) {
            return cb(new Error(checkIdExistenceResult.error.message))
        }

        // product
        const product = checkIdExistenceResult.data

        const checkDetailIdExistenceResult = await checkDetailIdExistence(detailId, modelName, detailModel)

        if (!checkDetailIdExistenceResult.isValid) {
            return cb(new Error(checkDetailIdExistenceResult.error.message))
        }

        // product detail
        const productDetail = checkDetailIdExistenceResult.data

        const checkHlImagesExistenceResult = checkHlImagesExistence(productDetail, actionType)

        if (!checkHlImagesExistenceResult.isValid) {
            return cb(new Error(checkHlImagesExistenceResult.error.message))
        }

        // check whether updated images is valid or if it is sent
        let { updatedImages } = req.body

        if (actionType === 'update') {
            if (updatedImages) {

                try {
                    updatedImages = JSON.parse(updatedImages)
                } catch (err) {
                    return cb(new Error(err.message))
                }

                for (const image of updatedImages) {
                    
                    // for (const highlightedImages of productDetail.highlightedImages) {
                    //     if (highlightedImages.imageName !== image.imageName || highlightedImages.imageUrl !== image.imageUrl) {
                    //         return cb(new Error('Invalid image are found'))
                    //     }
                    // }

                    let isValid = false

                    for (const highlightedImages of productDetail.highlightedImages) {
                        if (highlightedImages.imageName === image.imageName || highlightedImages.imageUrl === image.imageUrl) {
                            isValid = true
                            break
                        }
                    }

                    if (!isValid) {
                        return cb(new Error('Invalid image are found'))
                    }
                }

                // 'Invalid number of image are found'
                for (let i = 0; i < updatedImages.length - 1; i++) {

                    for (let j = i + 1; j < updatedImages.length; j++) {
                        if (updatedImages[i].imageName === updatedImages[j].imageName && updatedImages[i].imageUrl === updatedImages[j].imageUrl) {
                            return cb(new Error('Invalid number of image are found'))
                        }
                    }
                }
            }

        }

        // asign product detail and found color to req.body
        req.body.product = product
        req.body.productDetail = productDetail

        return cb(null, true)
    }

    return fileFilter
}

module.exports = {
    fileFilterCreator
}