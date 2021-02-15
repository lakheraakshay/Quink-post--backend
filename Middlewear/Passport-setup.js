
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config()


passport.use(new GoogleStrategy({
    clientID: "990734078330-of1e296vl3nrri3csrs05tautcabo09r.apps.googleusercontent.com",
    clientSecret: "peYp6KCgjjhHRJhjX3XDzPkI",
    callbackURL: "http://localhost:5000/user/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
    return done(null, profile)
}
))
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
