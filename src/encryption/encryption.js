import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hasPassword = (planiPassword) => {
  return bcrypt.hashSync(planiPassword, saltRounds);
};

export const comaprePassword = (plainPassword, hashPasswordDB) => {
  return bcrypt.compareSync(plainPassword, hashPasswordDB);
};
