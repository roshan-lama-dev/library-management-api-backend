import express from "express";
import {
  createTransaction,
  getAllTransaction,
} from "../../model/Transaction/TransactionModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const result = await createTransaction(req.headers.authorization);

    result?._id
      ? res.json({
          status: "success",
          message: "The new transaction has been created",
        })
      : res.json({
          status: "error",
          message: "Cannot create the new transaction",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await getAllTransaction();
    console.log(result);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
