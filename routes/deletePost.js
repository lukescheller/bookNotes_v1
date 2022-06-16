const express = require("express");
const router = express.Router();
const User = require("../models/User");
var ObjectId = require("mongodb").ObjectID;

router.post("/", async (req, res) => {
  try {
    const commentId = req.body.commentId;
    const userId = req.body.userId;
    const user = await User.findById(userId).populate("comments");
    const newComments = user.comments.filter(
      (c) => ObjectId(c._id).toString() !== commentId
    );
    user.comments = newComments;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
