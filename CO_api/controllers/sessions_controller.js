const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.post("/", (req, res) => {
  User.findOne({ email: req.body.logEmail }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (!foundUser) {
      console.log("Sorry, no user found.");
      res.send("No user found");
    } else {
      console.log("founduser: ", foundUser);
      if (bcrypt.compareSync(req.body.logPassword, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log("Password matched, sign in successfully!");
        res.send(foundUser);
      } else {
        console.log("Password does not match");
      }
    }
  });
});

module.exports = sessions;
