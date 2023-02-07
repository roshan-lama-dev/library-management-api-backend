import UserSchema from "./userSchema.js";

export const registerUser = (userObject) => {
  return UserSchema(userObject).save();
};

// get the login user. we will use the email as a filter to get the user and then check whether the plain passwrod from the req.body matched the database password or not
export const loginUser = (filter) => {
  return UserSchema.findOne(filter);
};
