import mongoose from "mongoose";

// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.hd0xd5k.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const url = `mongodb://0.0.0.0:27017/${process.env.MONGO_CLUSTER}`;

export const connectDatabase = async () => {
  return mongoose
    .connect(url)
    .then(() => console.log("Mongo connected!"))
    .catch((err) => {
      console.log("error connecting...");
      console.error(err);
    });
};

export const disconnectDatabase = () => {
  return mongoose.disconnect();
};
