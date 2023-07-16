import { Schema, model, UpdateWriteOpResult } from "mongoose";

const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
    default: 100,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
    // type: Types.ObjectId,
    // ref: "Planet",
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
  customers: {
    type: [String],
    required: true,
  },
});

export const launches = model("Launch", launchesSchema);
