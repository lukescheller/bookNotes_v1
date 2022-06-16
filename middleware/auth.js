const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");

const auth = async (req, res, next) => {
  try {
    //access cookie
    const token = req.cookies.access_token;

    //check if cookie is valid
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //find in db
    const user = await User.findOne({
      _id: decoded.user,
    });

    //set user in request body
    req.user = user;

    //continue program
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = auth;
