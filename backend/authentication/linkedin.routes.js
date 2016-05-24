var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var LinkedInStrategy = require('passport-linkedin').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


// Use the LinkedInStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//   invoke a callback with a user object.
passport.use(new LinkedInStrategy(
    {
        consumerKey: '77uxmexwc4wycy',
        consumerSecret: '3SDqQtXL9iuXbhEm',
        callbackURL: 'http://localhost:5000/auth/linkedin/callback',
        profileFields: [
            'id',
            'email-address',
            'first-name',
            'last-name',
            'headline',
            'summary',
            'location',
            'industry',
            'positions',
            'specialties',
            'picture-url',
            'public-profile-url',
        ]
    },
    function (token, tokenSecret, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            console.log("TOKEN = " + token);
            console.log("TOKEN SECRET = " + tokenSecret);      
            console.log("PROFILE = " + JSON.stringify(profile));

            // push the profile to cache.

            return done(null, profile);
        });
    }
));


var linkedInRouter = express.Router();

var router = function () {
    // GET /auth/linkedin
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in LinkedIn authentication will involve
    //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
    //   redirect the user back to this application at /auth/linkedin/callback
    linkedInRouter.route('/linkedin').get(
        passport.authenticate('linkedin'),
        function (req, res) {
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        });

    // GET /auth/linkedin/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    linkedInRouter.route('/linkedin/callback').get(
        passport.authenticate('linkedin', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/#/app/register');
        });

    linkedInRouter.route('/linkedin/logout').get(
        function(req, res) {
            req.logout();
            res.redirect('/');
        });

    return linkedInRouter;
}

module.exports = router;
