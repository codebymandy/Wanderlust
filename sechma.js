const Joi = require("joi");

 

 const listingSchema = Joi.object({
   
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().required().allow("" , null)
    
});

module.exports = listingSchema;

const reviewSchema = Joi.object({

       review: Joi.object({
       
        rating: Joi.number().required(),
        coment:Joi.string().required(),

       }).required(),

});

module.exports = reviewSchema;
