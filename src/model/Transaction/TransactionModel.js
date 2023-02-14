import TransactionSchema from "./TransactionSchema.js";

export const createTransaction = (transObj) => {
  return TransactionSchema(transObj).save();
};
