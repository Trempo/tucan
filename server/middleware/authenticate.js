const passport = require("passport");

module.exports = (req,res,next) => {
    passport.authenticate("jwt", {session: false}, function(err,user){
        if(err) return next(err);

        if(!user) return res.status(401).json({message:"Acceso denegado - No token"});

        req.user = user;

        next();
    })(req,res,next);
};
