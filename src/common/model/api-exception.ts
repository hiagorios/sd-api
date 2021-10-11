import { ValidationError } from "express-validator"

export default class ApiException extends Error {
    code: number
    message: string
    errors?: SimpleError[]

    constructor(code: number, message: string, errors?: SimpleError[]) {
        super(message)

        this.code = code
        this.message = message
        this.errors = errors
    }

    static fromValidation(errors: ValidationError[]): Partial<ApiException> {
        return {
            code: 400,
            message: 'Validation failed',
            errors: errors.map(error => {
                return {
                    domain: error.param,
                    message: error.msg,
                    reason: error.value
                }
            })
        }
    }
}

interface SimpleError {
    domain: string,
    reason: string,
    message: string
}