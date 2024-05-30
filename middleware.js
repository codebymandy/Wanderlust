module.exports.loggedIn = (req, res, next) => {

    //  console.log(req.path , ".." , req.originalUrl)  
    
    if (!req.isAuthenticated()) {
 
        req.session.redirectUrl = req.originalUrl;
        
        return res.redirect("/login");
    }  
    
    next();
    
};

 module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        // console.log(res.locals.redirectUrl); // Logging after assigning the value
    }
    next();
}





