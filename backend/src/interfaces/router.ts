import { Request, Response } from "express";

export type IRouterFunction = (req: Request, res: Response) => void;
