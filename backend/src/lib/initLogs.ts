import { NextFunction, RequestHandler } from "express";
import fs from "fs";
import { IncomingMessage, ServerResponse } from "http";
import morgan from "morgan";
import { join } from "path";

export const initLogs = (
  ...args: [
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    (err?: Error | undefined) => void
  ]
) => {
  const today = new Date();
  const cb = morgan("combined", {
    stream: fs.createWriteStream(
      join(
        __dirname,
        "..",
        "..",
        "logs",
        `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}.access.log`
      ),
      {
        flags: "a+",
      }
    ),
  });

  return cb(...args);
};
