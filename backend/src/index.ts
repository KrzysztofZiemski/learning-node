import http from "http";
import "dotenv/config";
import app from "./app";
import { loadPlanetData } from "./models/planets.model";
import { connectDatabase } from "./services/mongo";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDatabase();
  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
  });
}
startServer();

//for run cluster without pm2
// if (cluster.isPrimary) {
//   const MAX_PROCESS_TAKEN = process.env.MAX_PROCESS_TAKEN;
//   const cpusAvailable = os.cpus().length;

//   const numberOfWorkers = MAX_PROCESS_TAKEN
//     ? Math.min(Number(MAX_PROCESS_TAKEN), cpusAvailable)
//     : cpusAvailable;

//   Array.from({ length: numberOfWorkers }).forEach(() => {
//     cluster.fork();
//     console.log("cluster has been started");
//   });
// } else {
// startServer();
// }
