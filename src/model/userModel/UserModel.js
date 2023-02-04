// create the users / insert into the database

import userSchema from "./UserSchema.js";

export const createUser = (insertUserObj) => {
  return userSchema(insertUserObj).save();
};

// we need to get the user details first to compare the plain password from frontend with the backend hashed password. Therefore we use email as a filter to get the user details
export const getSingleUser = (email) => {
  return userSchema.findOne({ email });
};
