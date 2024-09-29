// file limit
const fileSizeLimiterCreator = (fileSize) => {
    const limits = {
        fileSize: fileSize
    }

    return limits
}

module.exports = { 
    fileSizeLimiterCreator
}