import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import * as swaggerJson from "../build/swagger.json";
import * as swaggerUI from "swagger-ui-express";

import { RegisterRoutes } from "../build/routes";

import errorHandler from "./errorHandler";
import notFoundHandler from "./notFoundHandler";

/** CONFIGURATIONS */
dotenv.config();

/** GLOBALS */
const PORT = process.env.PORT;

const app = express();

/** MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

/** ROUTES */
RegisterRoutes(app);

// @ts-ignore 
// Since errorHandler is not a proper middleware, we need to ignore the type error
app.use(errorHandler);
app.use(notFoundHandler);

/** LISTENERS */
app.listen(PORT, () => console.info("Listening on ::" + PORT));
