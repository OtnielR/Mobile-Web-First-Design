export function formatDate(dateTimeString) {
    const date = new Date(dateTimeString)

    const year = date.getFullYear()
    const month = getMonthName(date)
    const dayNumber = date.getDate()

    return `${month} ${dayNumber}, ${year}`
}

function getMonthName(date, locale = "en-US") {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
    return formatter.format(date)
}
