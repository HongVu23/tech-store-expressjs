const path = require('path')

// Check the file extension
const checkFileExt = (fileOriginalname) => {

    const fileExt = path.extname(fileOriginalname)

    const allowedExtensions = ['.jpg', '.jpeg', '.png'];

    if (!allowedExtensions.includes(fileExt)) {
        return { isValid: false, error: { message: "Only '.jpg', '.jpeg' and '.png' file extension are allowed" } }
    }

    return { isValid: true }
}

module.exports = {
    checkFileExt
}