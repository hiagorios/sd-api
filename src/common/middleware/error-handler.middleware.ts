import { NextFunction, Request, Response } from "express";
import * as CoreService from "../../core/core.service";
import ApiException from "../model/api-exception";
import { ErrorResponse } from "../model/error-response";

export const errorHandler = (
    error: ApiException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const errorResponse: ErrorResponse = {
        apiVersion: CoreService.getApiVersion(),
        error
    }
    response.status(error.code).send(errorResponse)
};