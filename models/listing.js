const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Review = require("./reviews.js")

const listingSchema = new Schema({

 title: String,
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String,

  reviews:[

     {
      type: Schema.Types.ObjectId,
     ref: "Review"
    }
  ],

  ower:[
     
    {
       type: Schema.Types.ObjectId,
       ref: "User",
    }
  ], 

  goematry: {
   type: {
     type: String, // Don't do `{ location: { type: String } }`
     enum: ['Point'], // 'location.type' must be 'Point'
     required: true
   },
   coordinates: {
     type: [Number],
     required: true
   }
 }

})

listingSchema.post("findByIdAndDelete" ,async(listing) =>{

   if(listing){

      await Review.deleteMany({_id:{$in: listing.reviews}})
   }
      
} );

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;      
