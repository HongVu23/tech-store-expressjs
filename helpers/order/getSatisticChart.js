const Order = require('../../models/order/Order')
const monthNames = require('../../configs/monthNames')

// get statistic of year
const getYearStatistics = async (year) => {

    const statisticYear = new Date(year).getFullYear()
    const startDate = new Date(statisticYear, 0, 1)
    const endDate = new Date(statisticYear, 11, 31)

    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                count: { $sum: { $sum: '$orderItems.quantity' } },
                revenue: { $sum: '$total' }
            }
        }
    ]

    const stats = await Order.aggregate(pipeline)

    // check whether stats is empty or not
    // if (!stats.length) {
    //     return { isValid: false, error: { message: 'There are no order for this year' } }
    // }

    // prepared result array
    const result = []
    for (let i = 1; i < monthNames.length; i++) {
        result.push({ month: monthNames[i], quantity: 0, revenue: 0 })
    }

    // asign stats data to prepared result array
    stats.forEach((stat) => {
        const month = stat._id
        const quantity = stat.count
        const revenue = stat.revenue

        for (const i of result) {
            if (i.month === monthNames[month]) {
                i.quantity = quantity
                i.revenue = revenue
                break
            }
        }
    })

    return { isValid: true, data: result }
}

// get statistic of month
const getMonthStatistics = async (year, month) => {

    const statisticYear = new Date(year).getFullYear()
    const startDate = new Date(statisticYear, month - 1, 1)
    const endDate = new Date(statisticYear, month, 0)

    const pipeline = [
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }
        },
        {
            $group: {
                _id: { $dayOfMonth: '$createdAt' },
                count: { $sum: { $sum: '$orderItems.quantity' } },
                revenue: { $sum: '$total' }
            }
        },
    ]

    const stats = await Order.aggregate(pipeline)

    // if (!stats.length) {
    //     return {
    //         isValid: false,
    //         error: { message: 'There are no orders for this month' },
    //     }
    // }

    // prepared result array
    const result = []
    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
        result.push({ day: i, quantity: 0, revenue: 0 })
    }

    stats.forEach((stat) => {
        const day = stat._id
        const quantity = stat.count
        const revenue = stat.revenue

        for (const i of result) {
            if (i.day === day) {
                i.quantity = quantity
                i.revenue = revenue
                break
            }
        }
    })

    return { isValid: true, data: result }
}

module.exports = {
    getYearStatistics,
    getMonthStatistics
}