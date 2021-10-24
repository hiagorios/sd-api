/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { check, checkSchema } from 'express-validator';
import { validate } from "../common/middleware/validate.middleware";
import ApiException from "../common/model/api-exception";
import { Peer } from "../peer/peer.interface";
import * as PeerService from "../peer/peer.service";
import * as CoreService from "./core.service";
import { ServerInfo } from "./schema/server-info.interface";
import serverInfoSchema from "./schema/server-info.schema";

/**
 * Router Definition
 */

export const coreRouter = express.Router()

/**
 * Controller Definitions
 */

// GET Info
coreRouter.get("/info", (req: Request, res: Response) => {
    const info: ServerInfo = CoreService.getServerInfo()
    res.status(200).send(info)
});

// PUT Info
coreRouter.put("/info",
    validate(checkSchema(serverInfoSchema)),
    async (req: Request, res: Response) => {
        const info: ServerInfo = req.body

        CoreService.updateServerInfo(info)
        res.status(200).send('Server info updated')
    });

// POST Resolver
coreRouter.post("/resolver",
    validate([check('arguments.nome').isString()]),
    (req: Request, res: Response) => {
        try {
            const name: string = req.body.arguments.nome
            const peer: Peer = PeerService.findByFirstName(name)

            res.status(200).send(peer)
        } catch (e: any) {
            throw new ApiException(404, e.message)
        }
    });
