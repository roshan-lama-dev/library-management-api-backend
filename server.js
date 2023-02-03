import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// connect to the database
import { databaseConnection } from "./src/dbConfig/dbConfig.js";
databaseConnection();

// using the middlewares

import cors from "cors";
app.use(cors());
app.use(express.json());
import morgan from "morgan";
app.use(morgan("dev"));

// Error Handling
app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Page not found. Please check the url",
  };
  next(error);
});

app.use((error, req, res, next) => {
  try {
    const statusCode = error.errorCode || 500;

    res.status(statusCode).json({
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

app.listen(PORT, (error, req, res, next) => {
  error
    ? console.log(error)
    : console.log(`The server is running at http://localhost:${PORT}`);
});
