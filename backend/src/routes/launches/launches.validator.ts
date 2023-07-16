import { Validator } from "../../helpers/validator";

export const validateLaunch = (launch: unknown) => {
  return Validator.validate(launch, {
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
};
