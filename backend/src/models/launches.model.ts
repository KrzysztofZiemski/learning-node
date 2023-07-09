import { Launch, LaunchPayload } from "../interfaces/launch";

let latestFlyNumber = 100;

const init: Launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("1 December 2023"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "Nasa"],
  upcoming: true,
  success: false,
};
export const launches: Map<string, Launch> = new Map([["100", init]]);

export const getAllLaunches = () => {
  return Array.from(launches.values());
};

export const getLaunch = (id: string) => {
  return launches.get(id);
};

export const addNewLaunch = (data: LaunchPayload) => {
  latestFlyNumber++;

  const launch = Object.assign(data, {
    flightNumber: latestFlyNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });
  launches.set(`${latestFlyNumber}`, launch);
  return launch;
};

export const abortLaunch = (id: string) => {
  const launch = getLaunch(id);

  if (!launch) return undefined;

  launch.upcoming = false;
  launch.success = false;
  return launch;
};
