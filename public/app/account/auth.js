angular
    .module('app')
    .factory('auth', auth);

auth.$inject = ['$http', '$q', 'identity', 'mvUser'];

function auth($http, $q, identity, mvUser) {

    return {
        authenticateUser: authenticateUser,
        logOutUsrer: logOutUsrer
    }

    function authenticateUser(username, password) {
        var dfd = $q.defer();
        $http.post('/login', {username: username, password: password})
            .then(function (response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
        return dfd.promise;
    }

    function logOutUsrer() {
        var dfd = $q.defer()
        $http.post('/logout', {logout: true})
            .then(function () {
                identity.currentUser = undefined
                return dfd.resolve();
            });
        return dfd.promise;
    }
}