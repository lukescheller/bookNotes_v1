const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const DB_CONNECTION = require("./config/connect");

DB_CONNECTION();

const app = express();
const port = process.env.port || 5000;

//reference your old code - when you change it back to how you had it the error message from the routes changes in the front end
//your error message was displayed with your old code
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//old code
// app.use(express.json({ extended: false }));
app.use(cors({ origin: "*" }));
//don't forget cookieParser - otherwise it won't show up
app.use(cookieParser());

app.use("/signup", require("./routes/signup"));
app.use("/signin", require("./routes/signin"));
app.use("/pagerefresher", require("./routes/pageRefresher"));
app.use("/publish", require("./routes/publishComment"));
app.use("/deletepost", require("./routes/deletepost"));
app.use("/editpost", require("./routes/editPost"));
app.use("/allusers", require("./routes/allUsers"));
app.use("/getuser", require("./routes/getUser"));
app.use("/vote", require("./routes/vote"));

app.listen(port, () => console.log(`server running on port: ${port}`));
