
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const reviewSchema  = require("../sechma.js")

module.exports.createreview = async(req ,res) =>{
 
    let r = reviewSchema.validate(req.body)
    
    console.log(r);
    

    let lesting = await Listing.findById(req.params.id);

    // console.log(lesting);
  
    let newReview = new Review(req.body.review);

    newReview.outhor = req.user._id;

    console.log( newReview.outhor);

    lesting.reviews.push(newReview);

    await newReview.save();

    await lesting.save();

    console.log("new review");

    res.redirect(`/listings/${lesting._id}`);
};

module.exports.destroyreview = async(req , res) =>{

    let {id} = req.params;

    let {reviewid} = req.params;

    let review = await Review.findById(reviewid);
    if(!review.outhor.equals(res.locals.curruser._id)){
         
        req.flash("succes" , "You don't have permission to delete" )
       
        return res.redirect(`/listings/${id}`);

      }

      Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewid}})
      await Review.findByIdAndDelete(reviewid);

      res.redirect(`/listings/${id}`); 
}