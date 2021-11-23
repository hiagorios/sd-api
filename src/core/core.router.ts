/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { check, checkSchema } from 'express-validator';
import { offlineHandler } from "../common/middleware/offline.middleware";
import { validate } from "../common/middleware/validate.middleware";
import ApiException from "../common/model/api-exception";
import { Peer } from "../peer/peer.interface";
import * as PeerService from "../peer/peer.service";
import * as CoreService from "./core.service";
import { CoordinatorInfo } from "./schema/coordinator-info.interface";
import { ElectionInfo } from "./schema/election-info.interface";
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

// GET Coordenador
coreRouter.get("/coordenador", 
    offlineHandler(),
    (req: Request, res: Response) => {
    const coordinator: CoordinatorInfo = CoreService.getCoordinatorInfo()
    res.status(200).send(coordinator)
});

// GET Eleicao
coreRouter.get("/eleicao", 
    offlineHandler(),
    (req: Request, res: Response) => {
    const info: ElectionInfo = CoreService.getElectionInfo()
    res.status(200).send(info)
});

// POST Eleicao
coreRouter.post("/eleicao",
    offlineHandler(),
    validate([
        check('id').isString(),
        check('dados').isArray()
    ]),
    (req: Request, res: Response) => {
        const electionId: string = req.body.id
        const electionData: string[] = req.body.dados
        CoreService.receiveElection(electionId, electionData)

        res.status(200).send('OK')
    });

// POST Eleicao
coreRouter.post("/eleicao/coordenador",
    offlineHandler(),
    validate([
        check('coordenador').isString(),
        check('id_eleicao').isString()
    ]),
    (req: Request, res: Response) => {
        try {
            const coordinatorId: string = req.body.coordenador
            const electionId: string = req.body.id_eleicao
            CoreService.endElection(electionId, coordinatorId, false)
            res.status(200).send('OK')
        } catch (e: any) {
            throw new ApiException(404, e.message)
        }
    });

// POST Eleicao
coreRouter.post("/eleicao/reset",
    (req: Request, res: Response) => {
        CoreService.resetCoodinator()
        res.status(200).send('OK')
    });