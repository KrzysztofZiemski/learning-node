import express from "express";
import planetsRouter from "./routes/planets/planets.router";
import cors, { CorsOptions } from "cors";
import { join } from "path";
import morgan from "morgan";
import { launchesRouter } from "./routes/planets/launches.router";

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
app.use(morgan("combined"));
app.use(express.static(join(__dirname, "..", "public")));
app.use(express.json());

//routers

app.use(planetsRouter);
app.use(launchesRouter);
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});

export default app;
