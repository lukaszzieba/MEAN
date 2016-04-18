var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');


exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, data) {
        res.send(data);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function (err, user) {
        console.log('SerVer USer controller Error: ' + err);
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                console.log('Error: ' + err);
                err = new Error('Duplicate username');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next();
            }
            res.send(user);
        })
    });
};

exports.updateUser = function (req, res) {
    var userUpdate = req.body;

    if (req.user._id != userUpdate._id && req.user.hasRole('admin')) {
        res.status(404);
        return res.end();
    }

    req.user.firstName = userUpdate.firstName;
    req.user.lastName = userUpdate.lastName;
    req.user.username = userUpdate.username;
    if (userUpdate.password && userUpdate.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdate.password);
    }

    User.findById(userUpdate._id, function(err, doc) {
        if (err) {
            res.status(400);
            console.log(err)
            return res.send({reason: err.toString()});
        }
        doc.firstName = userUpdate.firstName;
        doc.lastName = userUpdate.lastName;
        doc.username = userUpdate.username;
        if (userUpdate.password && userUpdate.password.length > 0) {
            doc.salt = req.user.salt;
            doc.hashed_pwd = req.user.hashed_pwd;
        }
        doc.save(function(err) {
            if(err) {
                res.status(400);
                console.log(err)
                return res.send({reason: err.toString()});
            }
            res.send(req.user);
        })
    });

    //req.user.save(function (err) {
    //    if (err) {
    //        res.status(400);
    //        console.log(err)
    //        return res.send({reason: err.toString()});
    //    }
    //    res.send(req.user);
    //})
};