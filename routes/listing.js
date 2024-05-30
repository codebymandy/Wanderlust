const express = require("express")
const routes = express.Router();
const Listing = require("../models/listing.js");

const listingcontroller = require("../controller/listing.js")

const multer  = require('multer')
const {storage} = require("../cloudinaryconfig.js")
const upload = multer({ storage })

 routes.get("/", listingcontroller.index );
  
  // show route
  
  routes.get("/:id", listingcontroller.show );
  

  // Edit route
  
  routes.get("/:id/edit", listingcontroller.edit);
   
  
  // Update route
  
  routes.put("/:id",  
  upload.single('editlisting[image]'),
  listingcontroller.update);
  
  
  //Delte routenode
  
  routes.delete("/:id/dele", listingcontroller.delete );


  module.exports = routes;