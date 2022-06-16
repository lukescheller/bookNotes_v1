const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    let book_title = req.body.book_title;
    let page = req.body.page;
    let comment = req.body.comment;

    //page number
    if (isNaN(req.body.page)) {
      throw new Error("Page must be a number");
    }

    //Comment model
    const comment_model = await Comment.findById({
      _id: req.body.id,
    });

    //book_title empty?
    if (req.body.book_title.trim() !== "") {
      comment_model.book_title = req.body.book_title;
    }

    //page empty?
    if (req.body.page.trim() !== "") {
      comment_model.page = req.body.page;
    }

    //comment empty?
    if (req.body.comment.trim() !== "") {
      comment_model.comment = req.body.comment;
    }

    //save comment
    await comment_model.save();

    //send back user - don't forget populate
    const user_model = await User.findById({ _id: req.body.user_id }).populate(
      "comments"
    );

    //send new user back
    res.send(user_model);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
