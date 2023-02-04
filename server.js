import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./src/dbConfig/dbConfig.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

dbConnection();

// creating the endp point for the userRouter
// middleware
app.use(express.json());
app.use(cors());
// importing the userRouter
import useRouter from "./src/router/UserRouter.js";
app.use("/api/v1/user", useRouter);

// bad url endpoint handling
app.use("*", (req, res, next) => {
  const errorObj = {
    statusCode: 404,
    messge: "Page not found",
  };
  next(errorObj);
});

// global error handling
app.use((error, req, res, next) => {
  try {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      status: "error",
      message: error.message,
    });
    if (
      error.message.includes(
        "E11000 duplicate key error collection: newlibrary.users index: email_1 dup key:"
      )
    ) {
      res.status(400).json({
        status: "error",
        message: "The email address is already used",
      });
    }
  } catch (error) {
    console.log(error.message);

    res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
