import express from "express";
import {
  comaprePassword,
  hashPlainPassword,
} from "../../bcrypthelper/bcrypt.js";
import { loginUser, registerUser } from "../../model/userModel/userModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = hashPlainPassword(req.body.password);
    req.body.password = hashedPassword;

    const result = await registerUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "Congratulation! Your accout has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create your account",
        });
    console.log(result);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email });
    console.log(result);
    const isComparePassword = comaprePassword(password, result.password);

    if (isComparePassword) {
      result.password = undefined;
      res.json({
        status: "success",
        message: "Login Successful",
        result,
      });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
