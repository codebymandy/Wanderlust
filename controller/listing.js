const { model } = require("mongoose");
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    
    
    try {
      let allListings = await Listing.find();
      if('country' in req.query){
        allListings=allListings.filter(item=>item.country.includes(req.query.country));
      }
      res.render("./listing/index.ejs", { listings: allListings });
    } catch (error) {
      // Handle error appropriately
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };


  module.exports.show = async (req, res) => {
    const { id } = req.params; // Directly extract id as a string
   
    const ls = await Listing.findById(id).populate({path:"reviews" ,
     populate:{
      path:"outhor",
    },
  }).populate("ower");

     

    console.log( "listing ower" , ls.ower)

    if(!ls){

        req.flash("err" , "Listing is not exist");
        res.redirect("/listings");
    }
    console.log(ls);
   
    res.render("./listing/show.ejs", { ls });
  };


  module.exports.edit =  async (req, res) => {
    let { id } = req.params;
  
    let editlisting = await Listing.findById(id);
  
    res.render("./listing/edit.ejs", { editlisting });
  };

  module.exports.update = async(req, res) => {
    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id,{...req.body.editlisting});

    if(typeof req.file !== "undefined"){
    let url = req.file.url;
    let filename = req.file.folder;
    listing.image = { filename: filename, url: url };
    await listing.save();
    }
    req.flash("succes" , "Listing Update")

    // const { title, description, image, price, location, country } = req.body;
  
    // try {
    //   // Find the listing by ID
    //   let listing = await Listing.findById(id);

    //   if(!listing.ower[0]._id.equals(res.locals.curruser._id)){
         
    //     req.flash("succes" , "You don't have permission to edit" )
       
    //     return res.redirect(`/listings/${id}`);

    //   }
  
    //   if (!listing) {
    //     return res.status(404).json({ message: "Listing not found" });
    //   }
  
    //   // Update the listing properties
    //   if (title) {
    //     listing.title = title;
    //   }
    //   if (description) {
    //     listing.description = description;
    //   }
    //   if (image && typeof image === 'object' && image.filename && image.url) {
       
    //     listing.image = image;
    //   }
    //   if (price) {
    //     listing.price = price;
    //   }
    //   if (location) {
    //     listing.location = location;
    //   }
    //   if (country) {
    //     listing.country = country;
    //   }
    
  
      // Save the updated listing
      
  
      res.redirect(`/listings/${id}`);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: "Something went worng" });
    // }
  };

  module.exports.delete = async (req, res) => {
    let { id } = req.params;
  
    console.log(id);
  
    await Listing.findByIdAndDelete(id);
  
    req.flash("succes"  , "Listings Delete")

    res.redirect("/listings");
  };