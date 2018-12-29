const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile
const { Profile } = require("../../model/profile");

//load users profile
const { User } = require("../../model/user");
//Load validation
const { validateProfileInput } = require("../../validation/profile");

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
      .populate("user", ["name", "email", "avatar"]) //from user with email name and password
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
// @route   POST api/users/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  //with the token provided passport will put user in to req
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validations
    if (!isValid) {
      //return any errors with 400
      return res.status(400).json(errors);
    }

    const profileFeilds = {};
    profileFeilds.user = req.user.id;

    if (req.body.handle) profileFeilds.handle = req.body.handle;
    if (req.body.company) profileFeilds.company = req.body.company;
    if (req.body.website) profileFeilds.website = req.body.website;
    if (req.body.location) profileFeilds.location = req.body.location;
    if (req.body.bio) profileFeilds.bio = req.body.bio;
    if (req.body.status) profileFeilds.status = req.body.status;
    if (req.body.githubusername)
      profileFeilds.githubusername = req.body.githubusername;
    //skills - split into array

    if (typeof req.body.skills !== "undefined") {
      profileFeilds.skills = req.body.skills.split(",");
    }
    //Social
    profileFeilds.social = {};
    if (req.body.youtube) profileFeilds.youtube = req.body.youtube;
    if (req.body.twitter) profileFeilds.twitter = req.body.twitter;
    if (req.body.facebook) profileFeilds.facebook = req.body.facebook;
    if (req.body.instagram) profileFeilds.instagram = req.body.instagram;
    if (req.body.linkedin) profileFeilds.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        ).then(profile => {
          console.log("err \n\n", profile);
          return res.json(profile);
        });
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFeilds.handle }).then(profile => {
          if (profile) {
            errors.handle = "That Profile already exists";
            res.status(400).json(errors);
          }
          // Save Profile

          new Profile(profileFeilds).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
