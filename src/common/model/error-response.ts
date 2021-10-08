import ApiException from "./api-exception"

export class ErrorResponse {
    apiVersion: string
    error: ApiException

    constructor(apiVersion: string, error: ApiException) {
        this.apiVersion = apiVersion
        this.error = error
    }
}