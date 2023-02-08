import BookSchema from "./BookSchema.js";

export const addBooks = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getBookByIsbn = (isbn) => {
  return BookSchema.findOne({ isbn });
};
