import BookSchema from "./BookSchema.js";

// add books
export const addBooks = (bookObj) => {
  return BookSchema(bookObj).save();
};

// this is done to check whether we have the book already in the database or not. we get return object from the datanbase using isbn as a filter
export const getBookByIsbn = (isbn) => {
  return BookSchema.findOne({ isbn });
};

// get the whole books

export const getAllbooks = () => {
  return BookSchema.find();
};
