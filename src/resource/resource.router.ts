/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import { check } from 'express-validator';
import { authenticate } from "../common/middleware/auth.middleware";
import { validate } from "../common/middleware/validate.middleware";
import ApiException from "../common/model/api-exception";
import * as ResourceService from './resource.service';
import { Resource } from "./schema/resource.interface";

/**
 * Router Definition
 */

export const resourceRouter = express.Router()

/**
 * Controller Definitions
 */

// GET Resource
resourceRouter.get("/",
    validate([
        check('codigo_de_acesso', 'codigo_de_acesso must be string').isString()
    ]),
    authenticate(
        ResourceService.getResource(),
        new ApiException(401, 'Access denied')
    ),
    (req: Request, res: Response) => {
        const resource: Resource = ResourceService.getResource()
        res.status(200).send({ valor: resource.value })
    });

// POST Resource
resourceRouter.post("/",
    // No authentication
    (req: Request, res: Response) => {
        try {
            const response = ResourceService.lockResource()
            res.status(200).send(response)
        } catch (error: any) {
            throw new ApiException(409, error.message)
        }
    });

// PUT Resource
resourceRouter.put("/",
    validate([
        check('codigo_de_acesso', 'codigo_de_acesso must be string').isString(),
        check('valor', 'valor must be specified').exists()
    ]),
    authenticate(
        ResourceService.getResource(),
        new ApiException(401, 'Access denied')
    ),
    async (req: Request, res: Response) => {
        const value: any = req.body['valor']

        ResourceService.updateResource(value)
        res.status(200).send({ valor: ResourceService.getResource().value })
    });

// DELETE Peers
resourceRouter.delete("/",
    validate([
        check('codigo_de_acesso', 'codigo_de_acesso must be string').isString()
    ]),
    authenticate(
        ResourceService.getResource(),
        new ApiException(410, 'Gone')
    ),
    (req: Request, res: Response) => {
        ResourceService.releaseResource()
        res.status(200).send('Resource released')
    });