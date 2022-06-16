const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.cookie === true) {
      //check token
      const decoded = jwt.verify(req.body.token, config.get("jwtSecret"));

      //create token
      const token = jwt.sign(
        { user: decoded.user },
        config.get("jwtSecret"),
        //15min
        { expiresIn: "900s" }
      );

      //find user
      const user = await User.findOne({
        _id: decoded.user,
      }).populate("comments");

      //assign token to user model
      user.access_token = token;

      //save user with new token
      await user.save();

      //respond with new cookie
      res.cookie("access_token", token);

      // // //...until here seems to be the refresh token solution
      res.send(user);
    } else {
      res.send("no work");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
