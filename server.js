var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

var app = express();

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

// dont wotks v3
/*var User = mongoose.model('User');
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/


// workrs v1
/*var User = mongoose.model('User');
passport.use(new LocalStrategy( function(username,password,done) {
    User.findOne({userName: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        /!* if (!user.verifyPassword(password)) {
         return done(null, false, {
         message: 'Incorrect password.'
         });
         }*!/
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});*/

// workrs v1
var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
           /* if (!user.verifyPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }*/
            return done(null, user);
        });
    }));


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

require('./server/config/routes')(app);

app.listen(config.port, function () {
    console.log('Listen on port ' + config.port);
});