import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    // const
    const PORT = process.env.MongoUrl;
    mongoose.set("strictQuery", false);
    const connect = mongoose.connect(PORT);

    connect && console.log("Mongdb is connected");
  } catch (error) {
    console.log(error);
  }
};
