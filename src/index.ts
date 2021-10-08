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
import { coreRouter } from "./core/core.router";
import { peerRouter } from "./peer/peer.router";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10) || 8000;

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 *  Routers
 */
app.use("/peers", peerRouter);

app.use('/', coreRouter);

/* Must be mounted after routers */
app.use(errorLogger);
app.use(errorHandler);

/* Must be mounted after all */
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});