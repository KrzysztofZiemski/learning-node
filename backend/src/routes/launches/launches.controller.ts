import { ErrorResponse } from "../../helpers/errorResponse";
import { Validator } from "../../helpers/validator";
import { IRouterFunction } from "../../interfaces/router";
import {
  addNewLaunch,
  getAllLaunches,
  abortLaunch,
} from "../../models/launches.model";

export const httpGetAllLaunches: IRouterFunction = (_, res) => {
  res.status(200).json(getAllLaunches());
};

export const httpAddNewLaunch: IRouterFunction = (req, res) => {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  const invalidFields = Validator.validate(launch, {
    launchDate: {
      date: "later",
    },
    mission: {
      string: {
        min: 1,
      },
    },
    rocket: {
      string: {
        min: 1,
      },
    },
    destination: {
      string: {
        min: 1,
      },
    },
  });

  if (invalidFields.length) {
    return res.status(400).json(ErrorResponse.generate(400, invalidFields));
  }

  const addedLaunch = addNewLaunch(launch);
  res.status(201).json(addedLaunch);
};

export const httpAbortLaunch: IRouterFunction = (req, res) => {
  const id = req.params.id;

  const validation = Validator.validate({ id }, { id: { string: { min: 1 } } });

  if (validation.length)
    return res.status(400).json(ErrorResponse.generate(400, validation));

  const aborted = abortLaunch(id);

  if (!aborted) res.status(404).json(ErrorResponse.generate(404, validation));

  return res.status(200).json(aborted);
};
