import express from "express";
import dotenv from "dotenv";

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
RegisterRoutes(app);

/** ERROR HANDLER */
app.use((err: any, _req: express.Request, res: express.Response) => {
  if (err && typeof err === "object" && err.status && err.message) {
    res.status(err.status).json(err.message);
  } else {
    res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
});

/** LISTENERS */
app.listen(PORT, () => console.info("Listening on ::" + PORT));
