
const capitalizeFirstLetter = (inputString) => {

    if (typeof inputString !== 'string') {
        throw new Error('Input must be a string');
    }

    if (inputString.length === 0) {
        return inputString;
    }

    const firstLetter = inputString.charAt(0).toUpperCase();
    const restOfString = inputString.slice(1);

    return firstLetter + restOfString;
}

const lowercaseFirstLetter = (inputString) => {
    if (typeof inputString !== 'string') {
        throw new Error('Input must be a string')
    }

    if (inputString.length === 0) {
        return inputString
    }

    const firstLetter = inputString.charAt(0).toLowerCase()
    const restOfString = inputString.slice(1)

    return firstLetter + restOfString
}

const convertToLowercase = (str) => {
    return str.trim().toLowerCase()
}

const convertToUppercase = (str) => {
    return str.trim().toUpperCase()
}

const convertToProductType = (productVariantType) => {

    const lowercaseString = productVariantType.toLowerCase()

    const productType = lowercaseString.replace('variant', '')

    return productType
}

module.exports = {
    capitalizeFirstLetter,
    lowercaseFirstLetter,
    convertToLowercase,
    convertToUppercase,
    convertToProductType
}