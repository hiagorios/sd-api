import { NextFunction, Request, Response } from "express";
import * as CoreService from "../../core/core.service";

export const offlineHandler = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (CoreService.getServerInfo().status === "offline") {
            const message = "I'm offline. Leave me alone!"
            res.status(404).send(message)
        } else {
            return next()
        }
    }
};