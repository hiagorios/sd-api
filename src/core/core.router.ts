/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express"
import HttpException from "../common/http-exception";
import { RequestModel } from "../common/request.model";
import { API } from "./api.interface"
import * as CoreService from "./core.service"
/**
 * Router Definition
 */

export const coreRouter = express.Router()

/**
 * Controller Definitions
 */

// POST Resolve

coreRouter.post("/resolver", (req: Request, res: Response) => {
    const name = (req.body as RequestModel)?.arguments.nome
    if (typeof name != 'string') {
        throw new HttpException(422, 'Name is required')
    }
    try {
        const api: API = CoreService.findByFirstName(name)

        res.status(200).send(api)
    } catch (e: any) {
        throw new HttpException(404, e.message)
    }
});
