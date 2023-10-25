import axios from "axios";
import { ILaunch, ILaunchPayload, ISpaceXLaunch } from "../interfaces/launch";
import { launches } from "./lauches.mongo";
import { planets } from "./planets.mongo";
import { FilterQuery } from "mongoose";

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

export const getAllLaunches = async () => {
  return await launches.find({}, { __v: 0 });
};

export const getLaunch = async (flightNumber: number) => {
  return await launches.findOne({ flightNumber }, { __v: 0 });
};

export const findLaunch = (filter: FilterQuery<ILaunch>) => {
  return launches.findOne(filter, { __v: 0 });
};

const getLastLaunchFlightNumber = async () => {
  const result = await launches.findOne().sort("-flightNumber");

  if (!result) return DEFAULT_FLIGHT_NUMBER;

  return result.flightNumber;
};

export const saveLaunch = async (data: ILaunch) => {
  const customers = ["ZTM", "NASA"];
  const upcoming = true;
  const success = true;

  await launches.findOneAndUpdate(
    { flightNumber: data.flightNumber },
    Object.assign(data, { customers, upcoming, success }),
    {
      upsert: true,
    }
  );

  return data;
};

export const scheduleNewLaunch = async (data: ILaunchPayload) => {
  const planet = await planets.findOne({ keplerName: data.destination });
  if (!planet) throw new Error("No matching planet founded");

  const lastLaunch = await getLastLaunchFlightNumber();
  const customers = ["ZTM", "NASA"];
  const upcoming = true;
  const success = true;

  return launches.findOneAndUpdate(
    { flightNumber: lastLaunch + 1 },
    Object.assign(data, { customers, upcoming, success }),
    {
      upsert: true,
    }
  );
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

const mapISpaceXLaunchToILaunch = ({
  success,
  upcoming,
  rocket,
  flight_number,
  date_local,
  name,
  payloads,
}: ISpaceXLaunch): ILaunch => {
  return {
    flightNumber: flight_number,
    customers: payloads.flatMap(({ customers }) => customers),
    destination: "",
    launchDate: new Date(date_local),
    mission: name,
    rocket: rocket.name,
    success,
    upcoming,
  };
};

const populateLaunches = async () => {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.error("Problem witch downloading launch data");
    throw new Error();
  }

  return response.data.docs
    .map(mapISpaceXLaunchToILaunch)
    .map((data: ILaunch) => saveLaunch({ ...data, upcoming: false }));
};

export const loadLaunchesData = async (): Promise<void> => {
  try {
    // const firstLaunch = false;
    const firstLaunch = await findLaunch({
      flightNumber: 1,
      rocket: "Falcon 1",
      mission: "FalconSat",
    });
    if (firstLaunch) {
      console.log("Launch data already loaded");
    } else {
      await populateLaunches();
      console.log("Launch data complete");
    }
  } catch (err) {
    console.error("Error loadLaunchesData", err);
  }
};
