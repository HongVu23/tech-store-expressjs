const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')
const { convertToLowercase } = require('../../../utils/standardizeStr')

// storage creator
const storageCreator = () => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            const productInfo = req.body.productInfo

            const folderName = standardizeFolderNames(productInfo.name)

            const destinationFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', convertToLowercase(productInfo.productType) + 's', folderName, 'review-images')

            if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder, { recursive: true })
            }

            cb(null, destinationFolder)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })

    return storage
}

module.exports = {
    storageCreator
}