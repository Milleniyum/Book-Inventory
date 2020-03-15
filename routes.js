var passport = require("./config/passport");
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");

router.post("/api/register", function (req, res) {
  console.log("registering user");

  //****
  //Do validation here before attempting to register user, such as checking for password length, capital letters, special characters, etc.
  //****

  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function () {
    res.json("user registered");
  }).catch(function (err) {
    console.log(err);
    res.json(err);
  });

});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

router.get("/api/logout", function (req, res) {
  req.logout();
  res.json({ message: "logged out" });
});

router.get("/api/user", function (req, res) {
  if (req.query.username) {
    db.User.find({
      where: {username: req.query.username}
    }).then(function(result) {
      res.json(result ? {length: result.length} : {length: 0});
    }).catch(function(err){
      res.json(err);
    })
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/authorized", isAuthenticated, function (req, res) {
  res.json(req.user);
});

router.get("/api/books", function (req,res){
  db.Book.findAll({order: [["author", "ASC"]]})
  .then(function(data){
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
})

router.post("/api/book", function(req, res) {
  db.Book.create(req.body)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err){
    console.log(err);
  });
});

router.get("/api/unknowns", function(req, res) {
  db.Unknown.findAll({order: [["id", "DESC"]]})
  .then(function(data){
    res.json(data);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.post("/api/unknown/:isbn", function(req, res) {
  db.Unknown.create({isbn: req.params.isbn})
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err){
    console.log(err);
  });
});

router.delete("/api/unknown/:id", function(req, res) {
  db.Unknown.destroy({where: {id: req.params.id}})
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err){
    console.log(err);
  });
});

// If no API routes are hit, send the React app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
