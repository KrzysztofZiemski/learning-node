import { IRouterFunction } from "../../interfaces/router";
import { getAllPlanets } from "../../models/planets.model";

export const httpGetAllPlanets: IRouterFunction = async (_, res) => {
  try {
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
  } catch (err) {
    return res.status(500).json(err);
  }
};
