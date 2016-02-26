var mongoose = require('mongoose');
    //passportLocalMongoose = require('passport-local-mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('connected to multivision');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
    });

    //userSchema.plugin(passportLocalMongoose);

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if(collection.length === 0) {
            User.create({firstName: 'Lukasz', lastName: 'Zięba', username: 'Finch'});
            User.create({firstName: 'John', lastName: 'Papa', username: 'John'});
            User.create({firstName: 'Joe', lastName: 'Eams', username: 'Joe'});
        }

    });
};

