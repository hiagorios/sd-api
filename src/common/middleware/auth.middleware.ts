import { NextFunction, Request, Response } from "express";
import { Resource } from "../../resource/schema/resource.interface";
import * as auth from "../auth";
import ApiException from "../model/api-exception";

/* Parameterized authentication middleware */
export const authenticate = (resource: Resource, exception: ApiException) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const accessToken = request.body['codigo_de_acesso']
        if (!auth.isAuthenticated(resource, accessToken)) {
            return next(exception)
        }
        return next()
    };
};