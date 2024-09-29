const asyncHandler = require('express-async-handler')
const productTypes = require('../../configs/productTypes')
const productVariantTypes = require('../../configs/productVariantTypes')
const { lowercaseFirstLetter } = require('../../utils/standardizeStr')

// get all orders
const getOrdersInfo = async (orders) => {

    // loop through all orders
    for (const order of orders) {

        // find and attach variant
        for (const orderItem of order.orderItems) {
            let variantModel
            // get specific model
            for (const productVariantType of productVariantTypes) {
                if (productVariantType.name === orderItem.productType) {
                    variantModel = productVariantType.model
                    break
                }
            }

            const productVariant = await variantModel.findOne({ _id: orderItem.product }).lean().exec()

            // re-asign to product of orderItem
            orderItem.product = productVariant

            // find appropriate model of orderItem
            let model, name
            for (const productType of productTypes) {
                if (productType.name + 'Variant' === orderItem.productType) {
                    model = productType.model
                    name = lowercaseFirstLetter(productType.name)
                    break
                }
            }

            // find product informations
            const product = await model.findOne({ _id: orderItem.product[name] }).lean().exec()

            // asign name, brand to product of orderItem
            orderItem.product.name = product.name
            orderItem.product.brand = product.brand
        }
    }

    return orders
}

module.exports = getOrdersInfo