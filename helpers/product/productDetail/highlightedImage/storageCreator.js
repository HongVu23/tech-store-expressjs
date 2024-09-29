const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { standardizeFolderNames } = require('../../../../utils/standardizeNames')

// storage creator
const storageCreator = (modelName) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            // receive product name from req.body
            const folderName = standardizeFolderNames(req.body.product.name)

            const destinationFolder = path.join(__dirname, '..', '..', '..', '..', 'public', 'images', 'products', modelName + 's', folderName, 'highlighted-images')

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