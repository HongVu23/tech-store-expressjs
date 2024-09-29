const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { standardizeFolderNames } = require('../../../utils/standardizeNames')
const { convertToLowercase } = require('../../../utils/standardizeStr')

// storage creator
const storageCreator = () => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            const user = req.body.user

            const folderName = standardizeFolderNames(user.username)

            const destinationFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'users', folderName)

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