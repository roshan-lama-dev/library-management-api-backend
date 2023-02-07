import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./src/dbCongif/dbConfig.js";

const PORT = process.env.PORT || 8000;
const app = express();

// connect to the databse
dbConnection();
// uncaught url handling

// middlewares
import cors from "cors";
import morgan from "morgan";
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

import userRouter from "./src/routers/userRouter/userRouter.js";
app.use("/api/v1/user", userRouter);

app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Page not found",
  };
  next(error);
});

// global error handling
app.use((error, req, res, next) => {
  try {
    const errorCode = error.errorCode || 500;
    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`The server is running at http://localhost:${PORT}`);
});
