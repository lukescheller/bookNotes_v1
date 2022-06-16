const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const ind_user_comment = await Comment.findById({
      _id: req.body.comment_id,
    });

    if (req.body.vote === "like") {
      if (!ind_user_comment.likes.includes(req.body.voter_id)) {
        ind_user_comment.likes.push(req.body.voter_id);
        ind_user_comment.dislikes.pull(req.body.voter_id);
      }
    }
    if (req.body.vote === "dislike") {
      if (!ind_user_comment.dislikes.includes(req.body.voter_id)) {
        ind_user_comment.dislikes.push(req.body.voter_id);
        ind_user_comment.likes.pull(req.body.voter_id);
      }
    }

    await ind_user_comment.save();

    const ind_user = await User.findById({ _id: req.body.ind_id }).populate(
      "comments"
    );

    await ind_user.save();

    res.send(ind_user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
