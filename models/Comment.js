const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
      trim: true,
    },
    page: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
