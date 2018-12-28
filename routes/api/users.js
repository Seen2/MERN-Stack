const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { User } = require("../../model/user");
const { secretOrkey } = require("../../config/keys");
const { validateRegisterInput } = require("../../validation/registor");
const { validateLoginInput } = require("../../validation/login");

const router = express.Router();
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get("/test", (req, res) => {
  res.json({ msg: "Working fine" });
  console.log(User);
});

// @route   GET api/users/register
// @desc    Tests users route
// @access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        }); //using gravatar library for avatar
        const newUser = new User({
          //creating user via mongo User model
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save((err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json(user);
                }
              });
            }
          });
        });
      } else {
        errors.email = "Email already exist";
        res.status(400).json(errors);
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      res.status(404).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //sucess
          const payload = {
            id: user.id,
            avatar: user.avatar,
            name: user.name
          };
          //asign token
          jwt.sign(payload, secretOrkey, { expiresIn: 3600 }, (err, token) => {
            if (!err) {
              res.json({ sucess: true, token: "Bearer " + token });
            }
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = router;
