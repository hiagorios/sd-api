export default class HttpException extends Error {
    statusCode?: number
    error: string

    constructor(statusCode: number, error: string) {
        super(error)

        this.statusCode = statusCode
        this.error = error
    }
}