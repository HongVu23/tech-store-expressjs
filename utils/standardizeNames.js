// standardize folder names:
const standardizeFolderNames = (str) => {
    if (!str) {
        return ''
    }
    return str.trim().toLowerCase().replace(/\s+/g, '-');
}

module.exports = {
    standardizeFolderNames
}