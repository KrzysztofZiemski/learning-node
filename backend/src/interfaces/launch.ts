export interface ILaunch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface ILaunchPayload
  extends Omit<ILaunch, "flightNumber" | "upcoming" | "success" | "customers"> {
  flightNumber?: number;
}

export interface ISpaceXLaunch {
  id: string;
  rocket: {
    name: string;
    id: string;
  };
  success: boolean;
  upcoming: boolean;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  payloads: { customers: string[]; id: string }[];
}

export interface ISpaceXLaunchesResponse {
  docs: ISpaceXLaunch;
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | 2;
  payloads: { customers: string[]; id: string };
}
