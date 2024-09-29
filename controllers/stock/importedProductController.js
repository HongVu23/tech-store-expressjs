const asyncHandler = require('express-async-handler')
const ImportedProduct = require('../../models/stock/ImportedProduct')

// get impored products in day
const getImportedProductsInDay = asyncHandler(async (req, res) => {

    const { date } = req.query

    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1) // Increase the day by 1 to get the entire current day

    // Find imported items within the specified time period
    const importedProducts = await ImportedProduct.find({
        createdAt: { $gte: startDate, $lt: endDate }
    }).populate('product')

    const statistics = {}

    importedProducts.forEach((importedProduct) => {
        const productType = importedProduct.productType.replace(/Variant/gi, "")

        if (statistics[productType]) {
            statistics[productType]++
        } else {
            statistics[productType] = 1
        }
    });

    res.json({ statistics })
})

module.exports = {
    getImportedProductsInDay
}