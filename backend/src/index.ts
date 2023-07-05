import http from "http";

import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
