import { IRouterFunction } from "../../interfaces/router";
import { planets } from "../../models/planets.model";

export const getAllPlanets: IRouterFunction = (_, res) => {
  return res.status(200).json(planets);
};
