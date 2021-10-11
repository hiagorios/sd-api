/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { checkSchema } from "express-validator";
import { validate } from "../common/middleware/validate.middleware";
import ApiException from "../common/model/api-exception";
import { Peer } from "./peer.interface";
import * as PeerService from "./peer.service";
import peerSchema from "./schema/peer.schema";
/**
 * Router Definition
 */

export const peerRouter = express.Router()

/**
 * Controller Definitions
 */

// GET Peers
peerRouter.get("/", (req: Request, res: Response) => {
    const peers = PeerService.getPeers()
    res.status(200).send(peers)
});

// GET Peer by ID
peerRouter.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const peer = PeerService.getPeerByID(id)
        res.status(200).send(peer)
    } catch (e: any) {
        throw new ApiException(404, e.message)
    }
});

// POST Peers
peerRouter.post("/",
    validate(checkSchema(peerSchema)),
    (req: Request, res: Response) => {
        try {
            const newPeer = req.body
            PeerService.addPeer(newPeer)

            res.status(200).send('Peer added')
        } catch (e: any) {
            throw new ApiException(409, e.message)
        }
    });

// PUT Peers
peerRouter.put("/:id",
    validate(checkSchema(peerSchema)),
    (req: Request, res: Response) => {
        try {
            const updatedPeer: Peer = req.body
            updatedPeer.id = req.params.id

            const peer = PeerService.updatePeer(updatedPeer)

            res.status(200).send(peer)
        } catch (e: any) {
            throw new ApiException(404, e.message)
        }
    });

// DELETE Peers
peerRouter.delete("/:id", (req: Request, res: Response) => {
    const id: string = req.params.id
    try {
        PeerService.deletePeer(id)
        res.status(200).send('Peer deleted')
    } catch (e: any) {
        throw new ApiException(404, e.message)
    }
});
