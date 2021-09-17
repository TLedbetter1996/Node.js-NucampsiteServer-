const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); //  will identify json tokens for us 

const config = require('./config.js'); //including the config.js file we just made 


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = user => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600}); // if not included the token will never expire! 
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false); 
                }
            });
        }
    )  
);


exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        err.status = 403; 
       // return next(err);
        console.log('You are not authorized to perform this operation!');
    }
}

exports.verifyUser = passport.authenticate('jwt', {session: false }); 