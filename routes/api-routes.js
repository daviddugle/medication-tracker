// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    return res.sendStatus(200);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  // let's post the notes and medications
  app.post("/api/notes", (req, res) => {
    if (req.user) {
      db.Notes.create({
        note: req.body.note,
        UserId: req.user.id
      }).then(() => {
        return res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
  app.post("/api/medications", (req, res) => {
    if (req.user) {
      db.Medications.create({
        medicationName: req.body.medicationName,
        timeOfDay: req.body.timeOfDay,
        dosage: req.body.dosage,
        description: req.body.description,
        UserId: req.user.id
      }).then(() => {
        return res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
  // time for some get routes
  app.get("/api/notes", (req, res) => {
    if (req.user) {
      const userId = req.user.id;
      db.Notes.findAll({
        where: {
          UserId: userId
        }
      }).then(results => res.json(results));
    } else {
      res.sendStatus(403);
    }
  });
  app.get("/api/medications", (req, res) => {
    if (req.user) {
      const userId = req.user.id;
      db.Medications.findAll({
        where: {
          UserId: userId
        }
      }).then(results => res.json(results));
    } else {
      res.sendStatus(403);
    }
  });
  // // this should render the proper medications for the user selected
  // app.get("/api/user_medications", (req, res) => {
  //   db.User.findAll({
  //     where: {
  //       UserId: req.user.id
  //     }
  //   }).then(() => res.sendStatus(200));
  // });
  // // this should render the proper notes for the user selected
  // app.get("/api/user_notes", (req, res) => {
  //   db.User.findAll({
  //     where: {
  //       UserId: req.user.id
  //     }
  //   }).then(() => res.sendStatus(200));
  // });

  // let's set some put routes so we can edit the items
  app.put("/api/notes", function(req, res) {
    console.log(req.body);
    db.Notes.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbNotes) {
      res.json(dbNotes);
    });
  });
  app.put("/api/medications", function(req, res) {
    console.log(req.body);
    db.Medications.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbMedications) {
      res.json(dbMedications);
    });
  });
  // delete routes
  app.delete("/api/notes/:id", function(req, res) {
    db.Notes.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNotes) {
      res.json(dbNotes);
    });
  });
  app.delete("/api/medications/:id", function(req, res) {
    db.Medications.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMedications) {
      res.json(dbMedications);
    });
  });


  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.get("/api/user_data", isAuthenticated, (req, res) => {
    if (req.user) {
      res.render("members");
    } 
  });
};
