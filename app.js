require('dotenv').config()
// console.log(process.env)

const express = require("express");
const mongoose = require("mongoose");
//ALTASDB DEPLOY
const dburl = process.env.ATLASDB_KEY;

const path = require("path");
const methodoverride = require("method-override");
const ejsmeta = require("ejs-mate");
const listingschema  = require("./sechma.js")
const Review = require("./models/reviews.js");
const reviewSchema  = require("./sechma.js")
const Listing = require("./models/listing.js");
const session = require('express-session')
// whenever deploye project on the internet use to mongo-session
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('./models/User.js')
const {loggedIn} = require("./middleware.js")

const app = express();
const port = 3000;

const listings = require("./routes/listing.js")
const reviews = require("./routes/reviews.js")
const userroutes = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(methodoverride("_method"));
app.engine("ejs", ejsmeta);
app.use(express.static(path.join(__dirname, "/public")));

// get image from cloud
const multer  = require('multer')
const {storage} = require("./cloudinaryconfig.js")
const upload = multer({ storage })

// mapbox 
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.Map_Key;
const  geocodingClient = mbxgeocoding({ accessToken: mapToken});



// mongo-session
const store = MongoStore.create({
  mongoUrl:dburl ,
  crypto: {
    secret: 'keyboard cat'
  },
  touchAfter: 24 * 3600
})



const sessionoption = { 
  store,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

  cookie:{
       
   expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
   maxAge: 7 * 24 * 60 * 60 * 1000,
 },

}


app.use(session(sessionoption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  // mongodb://127.0.0.1:27017/wanderlust
  try{
  await mongoose.connect(dburl);
} catch (error) {
  console.error( error);
 
}
}
app.get("/", (req, res , next) => {
  res.send("Hello World!");
  next();
});




app.use((req ,res , next) =>{

   res.locals.succes = req.flash("succes");
     
   res.locals.error = req.flash("error");

   res.locals.curruser = req.user;
   next();
})


// app.use( "/demouser" , async(req , res ) =>{

//    let fakeuser = new user({
         
//       email: "sukha@gmail.com",
//       username: "mani",
//    })  

//    let registed =  await user.register(fakeuser , "2587");

//    res.send(registed);

   
// })

  //searchbar

  app.post("/search" ,async(req,res)=>{
    //  console.log(req.body.search);
     res.redirect(`/listings?country=${req.body.search}`);
      
  })

  // Create New
app.get("/listing/new", loggedIn ,(req, res) => {
 

  res.render("./listing/new.ejs");
});



app.post("/listing", upload.single('listing[image]'),async (req, res ) => {
 
  // map geocoding for location
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send()

    

    
  let url = req.file.url;
  let filename = req.file.folder;
    

    let newlisting = new Listing(req.body.listing);
    newlisting.image = { filename: filename, url: url }; // Setting img object
    newlisting.ower = req.user;
    newlisting.goematry = response.body.features[0].geometry;
    let savelisting = await newlisting.save();
    console.log(savelisting)
    req.flash("succes" ,"New Listing create");
    res.redirect("/listings");
  
    // res.send(req.file);
  
});


 app.use("/listings" , listings)
 app.use("/listings/:id/reviews" , reviews)
 app.use("/" , userroutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
