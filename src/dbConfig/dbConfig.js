import mongoose from "mongoose";

export const databaseConnection = () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);
    const connect = mongoose.connect(mongoUrl);
    connect && console.log("MongoDb is connected");
  } catch (error) {
    console.log(error.message);
  }
};
