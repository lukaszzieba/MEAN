var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development : {
        db : 'mongodb://localhost/multivision',
        rootPath : rootPath,
        port: process.env.PORT || 3000
    },
    production : {
        db : 'mongodb://theFinch:lukazz1989@ds055895.mongolab.com:55895/the_finch_multivision',
        rootPath : rootPath,
        port: process.env.PORT || 80
    }
};