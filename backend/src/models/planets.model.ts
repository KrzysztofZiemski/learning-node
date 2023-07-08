import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";
import { IPlanet } from "../interfaces/planets";

export const planets: IPlanet[] = [];

const isHabitablePlanet = (planet: IPlanet) =>
  planet?.koi_disposition === "CONFIRMED" &&
  Number(planet.koi_insol) < 1.11 &&
  Number(planet.koi_insol) > 0.36 &&
  Number(planet.koi_prad) < 1.6;

export const loadPlanetData = (): Promise<IPlanet[]> => {
  return new Promise((resolve, reject) => {
    const pathToFile = join(__dirname, "..", "data", "planets.csv");

    createReadStream(pathToFile)
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (data: IPlanet) => {
        if (isHabitablePlanet(data)) planets.push(data);
      })
      .on("end", () => {
        resolve(planets);
      })
      .on("error", (error) => {
        console.log("error loading planets file", error);
        reject(error);
      });
  });
};

export const getAllPlanets = () => planets;
