const express = require("express");
const routes = express.Router();
const User = require("../models/User.js");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");

routes.get("/singup", (req, res) => {
  res.render("./user/singup.ejs");
});

routes.post("/singup", async (req, res) => {
  let { username, email, password } = req.body;

  let newuser = new User({ username, email });

  let registeruser = await User.register(newuser, password);

  req.login(registeruser, (err) => {
    if (err) {
      return next(err);
    }
 
    req.flash("succes", "singup on wunderlust");

    res.redirect("./listings");
  });

  // req.flash("succes" , "singup on wunderlust" )

  // res.redirect("./listings");
});

routes.get("/login", (req, res) => {
  res.render("./user/login.ejs");
});

routes.post(
  "/login",
  saveredirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),

  async (req, res) => {
    let riderectURl = res.locals.redirectUrl || "/listings";

    res.redirect(riderectURl);
  }
);

routes.get("/logout", (req, res) => {
  // Clear the user session to log them out
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/"); // Redirect to home or an error page
    }
    // Redirect the user to the login page or any other desired page
    res.redirect("./listings");
  });
});

module.exports = routes;
