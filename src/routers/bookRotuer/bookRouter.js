import express from "express";
import { addBooks, getBookByIsbn } from "../../model/bookModel/BookModel.js";

const router = express.Router();

router.post("/addbook", async (req, res, next) => {
  try {
    const { isbn } = req.body;
    const bookExists = await getBookByIsbn(isbn);
    if (bookExists?._id) {
      return res.json({
        status: "error",
        message: "Book already exists",
      });
    }
    const result = await addBooks(req.body);
    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "Books added successfully",
        })
      : res.json({
          status: "error",
          message: "Cannot add new books to the database",
        });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
