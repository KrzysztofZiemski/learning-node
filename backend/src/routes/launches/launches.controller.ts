import { ParsedQs } from "qs";
import { ErrorResponse } from "../../helpers/errorResponse";
import { Validator } from "../../helpers/validator";
import { IRouterFunction } from "../../interfaces/router";
import {
  scheduleNewLaunch,
  getAllLaunches,
  abortLaunch,
  getLaunch,
} from "../../models/launches.model";
import { validateLaunch } from "./launches.validator";
import { getPagination } from "../../services/query";

export const httpGetAllLaunches: IRouterFunction = async (req, res) => {
  res.status(200).json(await getAllLaunches(getPagination(req.query)));
};

export const httpAddNewLaunch: IRouterFunction = async (req, res) => {
  const launch = req?.body || {};

  launch.launchDate = launch.launchDate && new Date(launch.launchDate);

  const invalidFields = validateLaunch(launch);

  if (invalidFields.length) {
    return res.status(400).json(ErrorResponse.generate(400, invalidFields));
  }

  try {
    const addedLaunch = await scheduleNewLaunch(launch);
    res.status(201).json(addedLaunch);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "No matching planet founded") {
      res.status(400).json(ErrorResponse.generate(400, ["destination"]));
    }
    res.status(500).json(ErrorResponse.generate(500, [JSON.stringify(err)]));
  }
};

export const httpAbortLaunch: IRouterFunction = async (req, res) => {
  const flightNumber = Number(req.params.id);

  const validation = Validator.validate(
    { flightNumber },
    { flightNumber: { number: {} } }
  );

  if (validation.length)
    return res.status(400).json(ErrorResponse.generate(400, validation));

  try {
    const launch = await getLaunch(flightNumber);
    if (!launch) {
      return res
        .status(404)
        .json(ErrorResponse.generate(404, ["flightNumber"]));
    }

    const isOk = await abortLaunch(flightNumber);

    if (!isOk)
      return res.status(400).json(ErrorResponse.generate(500, ["not aborted"]));

    return res.status(200).json({});
  } catch (err) {
    res.status(500).json(ErrorResponse.generate(500, [JSON.stringify(err)]));
  }
};
