import { IRouterFunction } from "../../interfaces/router";
import { planets } from "../../models/planets.model";

export const getAllPlanets: IRouterFunction = async (_, res) => {
  try {
    return res.status(200).json(planets);
  } catch (err) {
    return res.status(500).json(err);
  }
};
