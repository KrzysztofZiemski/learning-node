import { Validator } from "../../helpers/validator";
import { IRouterFunction } from "../../interfaces/router";
import { getAllLaunches } from "../../models/launches.model";

export const httpGetAllLaunches: IRouterFunction = (_, res) => {
  res.status(200).json(getAllLaunches());
};

export const createLaunch: IRouterFunction = (req, res) => {
  const data = req.body;
  // if(Validator.launchValidate(data)
  // launches.set("", data);
  res.status(200).send("ok");
};
