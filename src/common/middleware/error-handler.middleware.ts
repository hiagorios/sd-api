import { NextFunction, Request, Response } from "express";
import * as CoreService from "../../core/core.service";
import ApiException from "../model/api-exception";
import { ErrorResponse } from "../model/error-response";

export const errorHandler = (
    exception: ApiException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const msg = exception.message
    const errorResponse: ErrorResponse = {
        apiVersion: CoreService.getApiVersion(),
        // error.message is not serialized directly
        error: { ...exception, message: exception.message }
    }
    response.status(exception.code).send(errorResponse)
};