const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { standardizeFolderNames } = require('../../../../utils/standardizeNames')

// storage creator
const storageCreator = (modelName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            // receive product name and product color from req.body
            const folderName = standardizeFolderNames(req.body.product.name)
            const folderColor = standardizeFolderNames(req.body.color)

            const destinationFolder = path.join(__dirname, '..', '..', '..', '..', 'public', 'images', 'products', modelName + 's', folderName, folderColor, 'color-images')

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