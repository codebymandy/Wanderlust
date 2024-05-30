const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewshema = new Schema({

    coment:String,
     rating:{

        type:Number,
        min:1,
        max:5,
        
    },
    createdAT:{
        type:Date,
        default:Date.now()
    },

     outhor:{
        
            type: Schema.Types.ObjectId,
            ref: "User",
         
     }
});

module.exports = mongoose.model("Review" , reviewshema)
