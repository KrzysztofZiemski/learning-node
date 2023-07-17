import express from "express";
import fs from "fs";
import cors, { CorsOptions } from "cors";
import { join } from "path";
import planetsRouter from "./routes/planets/planets.router";
import { launchesRouter } from "./routes/launches/launches.router";
import { initLogs } from "./lib/initLogs";
import { apiV1 } from "./routes/api_v1";

const app = express();

//middlewares

const CORS_WHITE_LIST =
  process.env.CORS_WHITE_LIST?.split(",").map((url) => url.trim()) || [];
const isProd = process.env.NODE_ENV === "production";

const corsOptions: CorsOptions | undefined = isProd
  ? {
      origin: function (origin, callback: any) {
        //@ts-ignore
        if (CORS_WHITE_LIST.indexOf(origin || "") !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    }
  : undefined;
app.use(cors(corsOptions));

app.use(initLogs);
app.use(express.static(join(__dirname, "..", "public")));
app.use(express.json());

//routers
app.use("/v1", apiV1);

app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});

export default app;
