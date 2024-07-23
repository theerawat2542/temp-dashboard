import moment from "moment";

export function RenderDateToString(date: Date | undefined, dateFormat: string) {
    const dateStr = moment(date).format(dateFormat)
    return dateStr
}