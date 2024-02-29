import {NEPALI_DATE_MAP} from "nepali-date/cjs/config"

export function monthDays(year, month) {
    if (year < 2000 || year > 2100 || month < 1 || month > 12) {
        return null
    }
    year = year % 2000
    return NEPALI_DATE_MAP[year][month]
}
