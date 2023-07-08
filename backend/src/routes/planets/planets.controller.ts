import { IRouterFunction } from "../../interfaces/router";
import { getAllPlanets } from "../../models/planets.model";

export const httpGetAllPlanets: IRouterFunction = async (_, res) => {
  try {
    return res.status(200).json(getAllPlanets());
  } catch (err) {
    return res.status(500).json(err);
  }
};
