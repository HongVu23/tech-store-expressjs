
// check whether year is valid or not
const isValidYear = (year) => {

    const parsedYear = parseInt(year)

    if (isNaN(parsedYear) || parsedYear <= 0) {
        return false
    }

    return true
}

// check whether month is valid or not
const isValidMonth = (month) => {

    const parsedMonth = parseInt(month)

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        return false
    }

    return true
}

module.exports = {
    isValidYear,
    isValidMonth
}