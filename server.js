var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(src, path) {
    return stylus(src).set('filename', path);
}

// app.set
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
// end of ---> app.set

// app.use
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(logger('dev'));
// end of ---> app.use

// mongodb
if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://theFinch:lukazz1989@ds055895.mongolab.com:55895/the_finch_multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function () {
    console.log('connected to multivision');
});
var mongooseSchema = mongoose.Schema({message: String});
var message = mongoose.model('message', mongooseSchema);
var mongoMessage;
message.findOne().exec(function (err, data) {
    mongoMessage = data.message;
    console.log(mongoMessage);
});
// ned of ---> mongodb

// routes
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
})

app.get('*', function (req, res) {
    res.render('index', {mongoMessage: mongoMessage});
});
// end of ---> routes

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listen on port 3000');
});