/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import HttpException from "../common/http-exception";
import { Peer } from "../peer/peer.interface";
import * as CoreService from "./core.service";
import * as PeerService from "../peer/peer.service";
import { ServerInfo } from "./server-info.interface";
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
coreRouter.put("/info", (req: Request, res: Response) => {
    const info: ServerInfo = req.body
    if (!info) {
        throw new HttpException(400, 'New info is required')
    }
    try {
        CoreService.updateServerInfo(info)

        res.status(200).send('Server info updated')
    } catch (e: any) {
        throw new HttpException(400, e.message)
    }
});


// POST Resolver
coreRouter.post("/resolver", (req: Request, res: Response) => {
    const name: string = req.body?.arguments.nome
    if (!name) {
        throw new HttpException(422, 'Name is required')
    }
    try {
        const peer: Peer = PeerService.findByFirstName(name)

        res.status(200).send(peer)
    } catch (e: any) {
        throw new HttpException(404, e.message)
    }
});