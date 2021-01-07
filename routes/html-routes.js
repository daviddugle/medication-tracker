// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (!req.user) {
     return res.redirect("/login");
    }
    res.redirect("/member");
  });

  // here

  app.get("/signup",(req,res) => res.render("signup"));

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
     return res.render("/member");
    }
    res.render("login");
  });



  app.get("/member", isAuthenticated, (req, res) => {
    if (req.user) {
      // const medications = db.User.findAll({
      //   where: { UserId: req.user.id },
      //   include: [{ model: db.medications }]
      // });


     return res.render("members");
    }

  });

 // to here



  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/", isAuthenticated, function(req, res) {
    res.render("members");
  });





// not needed below


  // app.get("/signup", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });




};
