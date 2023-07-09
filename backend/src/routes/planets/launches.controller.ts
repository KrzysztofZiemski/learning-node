import { Validator } from "../../helpers/validator";
import { IRouterFunction } from "../../interfaces/router";
import { addNewLaunch, getAllLaunches } from "../../models/launches.model";

export const httpGetAllLaunches: IRouterFunction = (_, res) => {
  res.status(200).json(getAllLaunches());
};

export const httpAddNewLaunch: IRouterFunction = (req, res) => {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  console.log(launch.launchDate instanceof Date);
  const invalidFields = Validator.validate(launch, {
    launchDate: {
      date: "later",
    },
    mission: {
      min: 1,
    },
    rocket: {
      min: 1,
    },
    destination: {
      min: 1,
    },
  });

  if (invalidFields.length) {
    return res.status(400).json({
      error: "Invalid input Data",
      fields: invalidFields.join(","),
    });
  }

  const addedLaunch = addNewLaunch(launch);
  res.status(201).json(addedLaunch);
};
