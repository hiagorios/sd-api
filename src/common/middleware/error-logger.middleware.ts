import { NextFunction, Request, Response } from "express";
import ApiException from "../model/api-exception";

export const errorLogger = (
    error: ApiException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(`[APIException] Code: ${error.code} - Message: ${error.message}`)
    next(error)
};