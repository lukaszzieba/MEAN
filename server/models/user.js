var mongoose = require('mongoose'),
    encrypt =  require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required'},
    lastName: {type:String, required:'{PATH} is required'},
    username: {
        type:String,
        required:'{PATH} is required',
        unique:true
    },
    salt: {type:String, required:'{PATH} is required'},
    hashed_pwd: {type:String, required:'{PATH} is required'},
    roles: [String]
});

userSchema.methods.verifyPassword = function (pwd) {
    return encrypt.hashPwd(this.salt, pwd) == this.hashed_pwd;
};

userSchema.methods.hadRole = function (role) {
    return this.roles.indexOf(role) > -1;

};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'finch');
            User.create({
                firstName: 'Lukasz',
                lastName: 'Zięba',
                username: 'Finch',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({
                firstName: 'John',
                lastName: 'Papa',
                username: 'John',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eams', username: 'Joe', salt: salt, hashed_pwd: hash});
        }

    });
}

exports.createDefaultUsers = createDefaultUsers;