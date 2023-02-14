import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    borrowedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      userName: { type: String },
    },

    borrowedBooks: {
      isbn: { type: String },
      thumbnail: { type: String },
      title: { type: String },
      author: { type: String },
      year: { type: Number },
    },

    returnDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transaction", transactionSchema);
