const asyncHandler = require('express-async-handler')
const productTypes = require('../../configs/productTypes')
const productVariantTypes = require('../../configs/productVariantTypes')
const { lowercaseFirstLetter } = require('../../utils/standardizeStr')

// searching
const searchProduct = asyncHandler(async (req, res) => {

    const { text } = req.query

    if (!text) {
        // return res.sendStatus(204)
        return res.json([])
    }

    const regex = new RegExp(text, 'i')

    let searchResults = []

    for (const productType of productTypes) {
        const searchResult = await productType.model.find({ name: regex }).lean().exec()

        // asign product type:
        for (const item of searchResult) {
            item.productType = productType.name
        }

        searchResults = [...searchResults, ...searchResult]
    }

    // filter for product that has variants
    const productsWithoutVariant = []
    
    for (const searchResult of searchResults) {
        
        // check whether has variants or not
        let model
        for (const productVariantType of productVariantTypes) {
            if (searchResult.productType + 'Variant' === productVariantType.name) {
                model = productVariantType.model
                break
            }
        }

        const varianst = await model.find({ [lowercaseFirstLetter(searchResult.productType)]: searchResult._id }).lean().exec()

        if (!varianst.length) {
            productsWithoutVariant.push(searchResult._id)
        }
    }

    // filter search results which does not have variants
    searchResults = searchResults.filter(product => !productsWithoutVariant.includes(product._id))
    
    return res.json(searchResults)
})

module.exports = {
    searchProduct
}