import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";
import { IPlanet } from "../interfaces/planets";
import { planets } from "./planets.mongo";

const isHabitablePlanet = (planet: Record<string, string>) =>
  planet?.koi_disposition === "CONFIRMED" &&
  Number(planet.koi_insol) < 1.11 &&
  Number(planet.koi_insol) > 0.36 &&
  Number(planet.koi_prad) < 1.6;

export const loadPlanetData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const pathToFile = join(__dirname, "..", "data", "planets.csv");

    createReadStream(pathToFile)
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async (data: Record<string, string>) => {
        if (isHabitablePlanet(data)) {
          savePlanet({ keplerName: data.kepler_name as string });
        }
      })
      .on("end", () => {
        console.log("loaded csv planets file");
        resolve();
      })
      .on("error", (error) => {
        console.log("error loading planets file", error);
        reject(error);
      });
  });
};
export const savePlanet = async ({ keplerName }: IPlanet) => {
  try {
    const res = await planets.updateOne(
      { keplerName },
      { keplerName },
      { upsert: true }
    );

    return;
  } catch (err) {
    console.error("Could save planet", err);
  }
};

export const getAllPlanets = async () => await planets.find({}, { __v: 0 });
