import { Launch } from "../interfaces/launch";

const init: Launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("1 December 2023"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "Nasa"],
  upcoming: false,
  success: false,
};
export const launches: Map<string, Launch> = new Map([["100", init]]);

export const getAllLaunches = () => {
  return Array.from(launches.values());
};
