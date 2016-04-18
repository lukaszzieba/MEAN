var mongoose = require('mongoose'),
    userModel = require('../models/user'),
    courseModel = require('../models/course');


module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('connected to multivision');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
};



