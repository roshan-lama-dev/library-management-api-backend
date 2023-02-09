import { loginUser } from "../model/userModel/userModel.js";

export const isAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    const user = authorization ? loginUser({ _id: authorization }) : null;
    console.log(user);
    user?._id
      ? next()
      : res.json({
          status: "error",
          message: "Unathorised request",
        });
  } catch (error) {
    next(error);
  }
};
