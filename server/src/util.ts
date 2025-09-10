export class Util {
    static readonly formatDate = (date: Date) => {
        const year = String(date.getFullYear())
        const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    static readonly formatTime = (date: Date) => {
        const hour = String(date.getHours()).padStart(2, '0')
        const minute = String(date.getMinutes()).padStart(2, '0')
        const second = String(date.getSeconds()).padStart(2, '0')

        return `${hour}:${minute}:${second}`
    }
}