const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const { Profile } = require("../../model/profile");
//load users model
const { User } = require("../../model/user");
//Load validation
//Profile Input
const { validateProfileInput } = require("../../validation/profile");
// Experience Input
const { validateExperienceInput } = require("../../validation/experience");
//Education Input
const { validateEducationInput } = require("../../validation/education");
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
    if (req.body.youtube) profileFeilds.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFeilds.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFeilds.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFeilds.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFeilds.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeilds },
          { new: true }
        ).then(profile => {
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

// @route   GET api/profile/all
// @desc    Get all profile
// @access  Public

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profiles: "There are no profiles" });
    });
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile this user" })
    );
});

// @route   POST api/profile/experience
// @desc    Add Experience to profile
// @access  Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //check validations
    if (!isValid) {
      //return any errors with 400
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array

      profile.experience.unshift(newExp);
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// @route   POST api/profile/education
// @desc    Add Education to profile
// @access  Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //check validations
    if (!isValid) {
      //return any errors with 400
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        feildofstudy: req.body.feildofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array

      profile.education.unshift(newEdu);
      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);
// @route   DELETE api/profile/experience/:exp_id
// @desc    Remove Experience from profile
// @access  Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        // Splice out of array
        profile.experience.splice(removeIndex, 1);
        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Remove Educatio from profile
// @access  Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        // Splice out of array
        profile.education.splice(removeIndex, 1);
        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/
// @desc    Remove User and his profile
// @access  Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ sucess: true });
      });
    });
  }
);

module.exports = router;
