export interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  destination: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface LaunchPayload
  extends Omit<Launch, "flightNumber" | "upcoming" | "success" | "customers"> {
  flightNumber?: number;
}
