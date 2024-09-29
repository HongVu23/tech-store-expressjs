const Tablet = require('../../../../../../models/product/mainProduct/mainProducts/Tablet')
const TabletVariant = require('../../../../../../models/product/mainProduct/mainProductVariants/TabletVariant')
const MainProductMiddleware = require("../../../classes/MainProductMiddleware")

class TabletMiddleware extends MainProductMiddleware {

    constructor() {
        super('tablet', Tablet, TabletVariant)
    }

}

module.exports = TabletMiddleware