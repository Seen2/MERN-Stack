const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();
//Load Post Model
const { Post } = require("../../model/post");
//Load Post Input Validation
const { validatePostInput } = require("../../validation/post");

// @route   GET api/posts /test
// @desc    Tests users route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Working fine" }));

// @route   POST api/posts/
// @desc    Create post
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validating post
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => {
      res.json(post);
    });
  }
);

module.exports = router;
