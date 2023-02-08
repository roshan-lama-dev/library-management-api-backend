import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },

    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export default mongoose.model("book", bookSchema);
