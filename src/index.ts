/**
 * Required External Modules
 */

import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./common/middleware/error-handler.middleware";
import { errorLogger } from "./common/middleware/error-logger.middleware";
import { notFoundHandler } from "./common/middleware/not-found.middleware";
import { offlineHandler } from "./common/middleware/offline.middleware";
import { coreRouter } from "./core/core.router";
import * as CoreService from "./core/core.service";
import { peerRouter } from "./peer/peer.router";
import { resourceRouter } from "./resource/resource.router";

dotenv.config()

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT, 10)
const coordinatorCheckInterval = 2000

const app = express()

/**
 *  App Configuration
 */

app.use(helmet())
app.use(cors())
app.use(express.json())

/**
 *  Routers
 */

app.use("/peers", peerRouter)

app.use("/recurso", resourceRouter)

app.use('/', coreRouter)

/* Must be mounted after routers */
app.use(errorLogger)
app.use(errorHandler)

/* Must be mounted after all */
app.use(notFoundHandler)

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    setInterval(() => {
        CoreService.checkCoordinatorStatus()
    }, coordinatorCheckInterval)
})