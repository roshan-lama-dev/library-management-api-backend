import bcrypt from "bcryptjs";

const saltRound = 10;
export const hashPlainPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};

export const comaprePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
