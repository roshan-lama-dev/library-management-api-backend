// create the users / insert into the database

import UserSchema from "./UserSchema.js";
import userSchema from "./UserSchema.js";

export const createUser = (insertUserObj) => {
  return userSchema(insertUserObj).save();
};

// get single user by udser _id

export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};

// get single user by filter, filter must be an object
export const getSingleUser = (filter) => {
  return UserSchema.findOne(filter);
};

// update the user by id
// make sure _id is string for the update schema and update user is an object
export const updateUser = (_id, udpateData) => {
  return UserSchema.findByIdAndUpdate(_id, updateUser);
};

// delete users
// _id must be a string
export const deleteUser = (_id) => {
  return UserSchema.findByIdAndDelete(_id);
};
