var auth = require('./auth');

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login',  auth.authenticate);

   /* app.post('/login', passport.authenticate('local'), function (req, res) {
        res.send(req.user);
    });*/

    app.get('*', function (req, res) {
        res.render('index');
    });
};