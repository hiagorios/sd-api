/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { itemsRouter } from "./items/items.router";

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
app.use("/items", itemsRouter);

app.get('/', (req, res) => {
    if (req.query.name) {
        res.send(`Hello ${req.query.name}!`)
    }
    else {
        res.send('Hello World!')
    }
});

/* Must be mounted after routers */
app.use(errorHandler);

/* Must be mounted after all */
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});