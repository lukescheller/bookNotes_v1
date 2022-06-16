const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const User = require("../models/User");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    //book title
    if (req.body.bookTitle == "") {
      throw new Error("Book title required");
    }
    //book page
    if (req.body.page == "") {
      throw new Error("Page number required");
    }
    //page number
    if (isNaN(req.body.page)) {
      throw new Error("Page number must be a number");
    }
    //comment
    if (req.body.comment == "") {
      throw new Error("Comment required");
    }

    const comment = new Comment({
      book_title: req.body.bookTitle,
      page: req.body.page,
      comment: req.body.comment,
      user_id: req.body.id,
    });

    await comment.save();

    const user = await User.findById({
      _id: req.body.id,
    });

    //you save the entire comment but only it's objectId will show up
    user.comments.push(comment);

    await user.save();

    res.status(200).send("comment published");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
