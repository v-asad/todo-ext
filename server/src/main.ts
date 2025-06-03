import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes";

import * as swaggerJson from "../build/swagger.json";
import * as swaggerUI from "swagger-ui-express";

import { RegisterRoutes } from "../build/routes";

/** CONFIGURATIONS */
dotenv.config();

/** GLOBALS */
const PORT = process.env.PORT;

const app = express();

/** MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

/** ROUTES */
app.use("/", mainRouter);

RegisterRoutes(app);

/** LISTENERS */
app.listen(PORT, () => console.info("Listening on ::" + PORT));
