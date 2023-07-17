import express from "express";
import planetsRouter from "./planets/planets.router";
import { launchesRouter } from "./launches/launches.router";

export const apiV1 = express.Router();

apiV1.use("/planets", planetsRouter);
apiV1.use("/launches", launchesRouter);
