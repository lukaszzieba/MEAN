var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    stylus = require('stylus'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

module.exports = function (app, config) {

    function compile(src, path) {
        return stylus(src).set('filename', path);
    }

    // app.set
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    // end of ---> app.set

    // app.use
    app.use(express.static(config.rootPath + '/public'));
    app.use(cookieParser());
    //app.use(bodyParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressSession({secret: 'multi vision unicorns',resave:false,saveUninitialized:false}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(logger('dev'));
    // end of ---> app.use
};