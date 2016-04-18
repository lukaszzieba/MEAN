angular
    .module('app')
    .factory('auth', auth);

auth.$inject = ['$http', '$q', 'identity', 'mvUser'];

function auth($http, $q, identity, mvUser) {

    return {
        authenticateUser: authenticateUser,
        logOutUsrer: logOutUsrer,
        authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
        createUser: createUser,
        authorizeAuthenticateUserForRoute: authorizeAuthenticateUserForRoute,
        updateCurrentUser: updateCurrentUser
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

    function authorizeCurrentUserForRoute(role) {
        if(identity.isAuthorized(role)) {
            return true;
        } else {
            return $q.reject('not authorized');
        }
    }

    function authorizeAuthenticateUserForRoute() {
        if(identity.isAuthenticated()) {
            return true;
        }else {
            return $q.reject('not authorized');
        }
    }

    function  createUser(newUserData) {
        var newUser = new mvUser(newUserData);
        var dfd = $q.defer();

        newUser.$save().then(function() {
            identity.currentUser = newUser;
            dfd.resolve();
        }, function(response) {
            console.log("Front auth error: " +response);
            dfd.reject(response.data.reason)
        });
        return dfd.promise;
    }

    function updateCurrentUser(newUserData) {
        var dfd = $q.defer();

        var clone = angular.copy(identity.currentUser);
        angular.extend(clone, newUserData);
        clone.$update().then(function() {
            identity.currentUser = clone;
            dfd.resolve();
        }, function(response) {
            dfd.reject(response.data.reason)
        });
        return dfd.promise;
    }

}