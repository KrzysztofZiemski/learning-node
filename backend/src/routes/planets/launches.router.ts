import express from "express";
import { httpGetAllLaunches } from "./launches.controller";

export const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
