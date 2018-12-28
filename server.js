const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const { URI } = require("./config/keys");

mongoose.connect(
  URI,
  { useNewUrlParser: true }
);
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //used for post request to get body in request
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = 5000; // || process.env.PORT

app.listen(port, () => console.log(`listening on port ${port}...`));
