const asyncHandler = require('express-async-handler')
const TabletMiddleware = require('../classes/TabletMiddleware')

// create new tablet middleware object
const tabletMiddleware = new TabletMiddleware()

module.exports = {
    checkIdExistence: asyncHandler(tabletMiddleware.checkIdExistence.bind(tabletMiddleware)),

    createNewTablet: {
        checkRequiredFieldsCNT: tabletMiddleware.checkRequiredFieldsCNP.bind(tabletMiddleware),
        checkDuplicateTablet: asyncHandler(tabletMiddleware.checkDuplicateProduct.bind(tabletMiddleware))
    },

    updateTablet: {
        checkRequiredFieldsUT: tabletMiddleware.checkRequiredFieldsUP.bind(tabletMiddleware)
    },

    deleteTablet: {
        checkVariants: asyncHandler(tabletMiddleware.checkVariants.bind(tabletMiddleware))
    }
}