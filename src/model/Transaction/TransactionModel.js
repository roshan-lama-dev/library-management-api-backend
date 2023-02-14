import TransactionSchema from "./TransactionSchema.js";

export const createTransaction = (transObj) => {
  return TransactionSchema(transObj).save();
};

export const getAllTransaction = () => {
  return TransactionSchema.find();
};

export const getTransactionByQuery = (userId, isbn) => {
  return TransactionSchema.findOne({
    "borrowedBy.userId": { $in: userId },
    "borrowedBook.isbn": { $in: isbn },
  });
};

export const findTransactionAndUpdate = (_id, obj) => {
  return TransactionSchema.findByIdAndUpdate(_id, obj, { new: true });
};
