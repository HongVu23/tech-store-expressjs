const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')

// storage creator
const storageCreator = (modelName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            const productVariant = req.body.productVariant

            let folderName, folderColor

            if (productVariant) {

                folderName = standardizeFolderNames(req.body.name)
                folderColor = standardizeFolderNames(productVariant.color)

            } else {
                folderName = standardizeFolderNames(req.body.name)
                folderColor = standardizeFolderNames(req.body.color)
            }

            const destinationFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'products', modelName + 's', folderName, folderColor)

            if (!fs.existsSync(destinationFolder)) {
                fs.mkdirSync(destinationFolder, { recursive: true })
            }

            cb(null, destinationFolder)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    return storage
}

module.exports = {
    storageCreator
}