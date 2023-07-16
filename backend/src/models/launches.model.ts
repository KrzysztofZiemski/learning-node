import { LaunchPayload } from "../interfaces/launch";
import { launches } from "./lauches.mongo";
import { planets } from "./planets.mongo";

const DEFAULT_FLIGHT_NUMBER = 100;

export const getAllLaunches = async () => {
  return await launches.find({}, { __v: 0 });
};

export const getLaunch = async (flightNumber: number) => {
  return await launches.findOne({ flightNumber }, { __v: 0 });
};

const getLastLaunchFlightNumber = async () => {
  const result = await launches.findOne().sort("-flightNumber");

  if (!result) return DEFAULT_FLIGHT_NUMBER;

  return result.flightNumber;
};

export const saveLaunch = async (data: LaunchPayload) => {
  const planet = await planets.findOne({ keplerName: data.destination });
  if (!planet) throw new Error("No matching planet founded");

  const customers = ["ZTM", "NASA"];
  const upcoming = true;
  const success = true;

  if (!data.flightNumber) {
    const lastLaunch = await getLastLaunchFlightNumber();
    data.flightNumber = lastLaunch + 1;
  }

  await launches.findOneAndUpdate(
    { flightNumber: data.flightNumber },
    Object.assign(data, { customers, upcoming, success }),
    {
      upsert: true,
    }
  );

  return data;
};

export const abortLaunch = async (flightNumber: number) => {
  const abortedData = await launches.updateOne(
    { flightNumber },
    {
      upcoming: false,
      success: false,
    }
  );
  const isOk =
    abortedData.modifiedCount === 1 && abortedData.modifiedCount === 1;

  return isOk;
};
