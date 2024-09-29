const asyncHandler = require('express-async-handler')

// add quantity to product in inventory
const addProductQuantity = asyncHandler(async (req, res) => {

    const { productVariant, quantity } = req.body

    // check whether quantity is valid or not
    if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: 'Invalid quantity' })
    }
    
    // add quantity to inventory
    productVariant.quantity += quantity

    await productVariant.save()

    return res.json({ message: 'Add quantity to inventory successes' })
})

module.exports = {
    addProductQuantity
}