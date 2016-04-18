var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses');


module.exports = function (app) {

    app.get('/api/users', auth.requireRole('admin') ,users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);


    app.get('/api/course', courses.getCourses);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);


    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });

    app.all('/api/*', function(req, res) {
        res.sendStatus(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrapedUser: req.user
        });
    });
};