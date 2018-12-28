const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile
const { Profile } = require("../../model/profile");

//load users profile
const { User } = require("../../model/user");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Working fine" }));

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  //with the token provided passport will put user in to req
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No Profile for this user";
          return res.status(400).json(errors);
        } else {
          return res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
