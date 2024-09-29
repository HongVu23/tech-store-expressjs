const multer = require('multer')

const configUploadSingle = (storage, fileFilter, limits, fileName) => {

    const upload = multer({
        storage,
        fileFilter,
        limits
    }).single(fileName)

    return upload
}

const configUploadMultiple = (storage, fileFilter, limits, filesName, numberOfFile) => {

    const upload = multer({
        storage,
        fileFilter,
        limits
    }).array(filesName, numberOfFile)

    return upload
}

module.exports = {
    configUploadSingle,
    configUploadMultiple
}