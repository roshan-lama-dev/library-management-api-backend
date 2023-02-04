import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const PORT = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);
    const connect = mongoose.connect(PORT);
    connect && console.log("mongoDb is connected");
  } catch (error) {
    console.log(error.message);
  }
};
