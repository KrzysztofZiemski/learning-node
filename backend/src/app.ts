import express from "express";
import planetRouter from "./routes/planets/planets.router";
import cors, { CorsOptions } from "cors";

const app = express();

//cors middleware
const CORS_WHITE_LIST =
  process.env.CORS_WHITE_LIST?.split(",").map((url) => url.trim()) || [];
const isProd = process.env.NODE_ENV === "production";
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
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

//json middleware
app.use(express.json());

//routers

app.use(planetRouter);

export default app;
