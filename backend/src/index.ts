import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import app from "./app";
import { loadPlanetData } from "./models/planets.model";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.hd0xd5k.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

  await mongoose
    .connect(uri)
    .then(() => console.log("Mongo connected!"))
    .catch((err) => {
      console.error(err);
    });
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
