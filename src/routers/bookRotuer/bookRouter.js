import express from "express";
import {
  addBooks,
  findBookAndDelete,
  findBooksByIdAndUpdate,
  getAllbooks,
  getBookByIsbn,
  getBooksById,
  getBorrowedBooks,
} from "../../model/bookModel/BookModel.js";
import { getUserById } from "../../model/userModel/userModel.js";

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

// get the books
router.get("/", async (req, res, next) => {
  try {
    const result = await getAllbooks();
    return res.json({
      result,
    });
    // console.log(result);
  } catch (error) {
    next(error);
  }
});

// get the borrowed Books
router.get("/borrowedBooks", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const borrowedBooks = await getBorrowedBooks(req.headers.userId);
  } catch (error) {
    next(error);
  }
});

// borrow a book

router.post("/borrow", async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const { authorization } = req.headers;

    const book = await getBooksById(bookId);
    const user = await getUserById(authorization);

    if (book?._id && user?._id) {
      if (book?.borrowedBy.length) {
        return res.json({
          status: "error",
          message:
            "This book has already been borrowed and will be available once it has been returned",
        });
      }

      // we do new true while updating the database so that we can get the new data instantly
      // we use push so that we can update
      const updateBook = await findBooksByIdAndUpdate(bookId, {
        $push: { borrowedBy: user._id },
      });

      return updateBook?._id
        ? res.json({
            status: "success",
            message: "You have borrowed this book",
          })
        : res.json({
            status: "error",
            message: "Something went wrong. Cannot borrow this book",
          });
    }
  } catch (error) {
    next(error);
  }
});

// deleteBooks

router.delete("/", async (req, res, next) => {
  try {
    const result = await findBookAndDelete(req.body.bookId);

    result?._id
      ? res.json({
          status: "success",
          message: "The book is deleted sucessfully",
        })
      : res.json({
          status: "error",
          message: "Cannot delete the book",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
