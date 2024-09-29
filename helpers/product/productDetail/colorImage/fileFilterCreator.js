const mongoose = require('mongoose')
const { capitalizeFirstLetter } = require('../../../../utils/standardizeStr')
const { checkFileExt } = require('../../../uploadFile/checkFileExt')
const { checkIdExistence } = require('../../checkIdExistence')
const { checkDetailIdExistence } = require('../checkDetailIdExistence')

// check whether color is sent or not (required field)
const checkRequiredColor = (color) => {

    if (!color) {
        return { isValid: false, error: { message: 'Color is required' } }
    }

    return { isValid: true }
}

// check whether color is exist or not
const checkColorExistence = (color, productDetail) => {

    // check for the color if it is exist in the products or not
    let foundColor
    for (const colorObj of productDetail.colors) {
        if (colorObj.color === color) {
            foundColor = colorObj
            break
        }
    }

    if (!foundColor) {
        return { isValid: false, error: { message: 'Color not found' } }
    }

    return { isValid: true, data: foundColor }
}

// check whether this color already has images
const checkImagesExistence = (colorObj, actionType) => {

    if (actionType === 'create') {

        if (colorObj.colorImages.length) {
            return { isValid: false, error: { message: 'Color already have images' } }
        }

    }

    if (actionType === 'update') {

        if (!colorObj.colorImages.length) {
            return { isValid: false, error: { message: 'There are no images for color' } }
        }

    }

    return { isValid: true }
}

const fileFilterCreator = (actionType, modelName, model, detailModel) => {

    const fileFilter = async (req, file, cb) => {
        console.log('filter')

        const id = req.params[modelName + 'Id']
        const detailId = req.params[modelName + 'DetailId']
        const { color } = req.body

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

        const checkRequiredColorResult = checkRequiredColor(color)

        if (!checkRequiredColorResult.isValid) {
            return cb(new Error(checkRequiredColorResult.error.message))
        }

        const checkColorExistenceResult = checkColorExistence(color, productDetail)

        if (!checkColorExistenceResult.isValid) {
            return cb(new Error(checkColorExistenceResult.error.message))
        }

        // found color
        const foundColor = checkColorExistenceResult.data

        const checkImagesExistenceResult = checkImagesExistence(foundColor, actionType)

        if (!checkImagesExistenceResult.isValid) {
            return cb(new Error(checkImagesExistenceResult.error.message))
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

                    let isValid = false
                    
                    for (const colorImage of foundColor.colorImages) {

                        console.log({ image, colorImage })
    
                        if (colorImage.imageName === image.imageName && colorImage.imageUrl === image.imageUrl) {
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

                    for (let j = i; j < updatedImages.length; i++) {
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
        req.body.foundColor = foundColor

        return cb(null, true)
    }

    return fileFilter
}

module.exports = {
    fileFilterCreator
}