import http from "http";
import "dotenv/config";
import app from "./app";
import { loadPlanetData } from "./models/planets.model";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

(async function startServer() {
  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
  });
})();
