angular
    .module('app')
    .factory('auth', auth);

auth.$inject = ['$http', '$q', 'identity'];

function auth($http, $q, identity) {

    return {
        authenticateUser : authenticateUser
    }

    function  authenticateUser(username, password) {
        var dfd = $q.defer();
        $http.post('/login', {username: username, password: password})
            .then(function (response) {
                if (response.data.success) {
                    identity.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
        return dfd.promise;
    }
}