import express from "express";
import { comaprePassword, hasPassword } from "../encryption/encryption.js";
import { createUser, getSingleUser } from "../model/userModel/UserModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashedPassedFromBycrypt = hasPassword(req.body.password);

    console.log(hashedPassedFromBycrypt);

    req.body.password = hashedPassedFromBycrypt;

    const result = await createUser(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "New user registered",
        })
      : res.json({
          status: "error",
          message: "Cannot resgister the new user",
        });
  } catch (error) {
    next(error);
  }
});

// login users

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await getSingleUser(email);

    if (result?._id) {
      const isPasswordMatched = comaprePassword(
        req.body.password,
        result.password
      );

      if (isPasswordMatched) {
        result.password = undefined;
        return res.json({
          status: "success",
          message: "Login successfull",
          result,
        });
      }
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      return res.status(400).json({
        status: "error",
        message: "The email address is already used",
      });
    }
    next(error);
  }
});

export default router;
