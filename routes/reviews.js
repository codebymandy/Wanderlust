const express = require("express");
const routes = express.Router({mergeParams:true});
const {loggedIn} = require("../middleware.js")

const reviewcontroller = require("../controller/review.js")
// review

//Post review

routes.post("/" ,loggedIn  ,reviewcontroller.createreview )

// reviews delelt 

routes.delete("/:reviewid" ,loggedIn, reviewcontroller.destroyreview )

module.exports = routes;