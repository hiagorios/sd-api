import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import ApiException from "../model/api-exception";

/* Parameterized validation middleware */
export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // run validations
        for (let validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            // if no errors, call next middleware/handler
            return next()
        }
        // otherwise call next middleware passing error
        // this will be caught by ApiException error handler
        return next(ApiException.fromValidation(errors.array()))
    };
};