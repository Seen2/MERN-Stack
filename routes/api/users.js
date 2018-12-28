const express = require("express");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Users } = require("../../model/users");
const { secretOrkey } = require("../../config/keys");

const router = express.Router();
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get("/test", (req, res) => {
  res.json({ msg: "Working fine" });
  console.log(Users);
});

// @route   GET api/users/register
// @desc    Tests users route
// @access  Public

router.post("/register", (req, res) => {
  Users.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      }); //using gravatar library for avatar
      const newUser = new Users({
        //creating user via mongo Users model
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
      res.status(400).json(user);
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email }).then(user => {
    if (!user) {
      res.status(404).json({ email: "Users not found" });
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
              res.json({ msg: "sucess", token: "Bearer " + token });
            }
          });
        } else {
          return res.status(400).json({ msg: "Incorect password" });
        }
      });
    }
  });
});

module.exports = router;
