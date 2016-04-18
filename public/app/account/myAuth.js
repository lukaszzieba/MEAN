angular
    .module('app')
    .factory('myAuth', myAuth);

myAuth.$inject = ['$q', 'identity'];

function myAuth($q, identity) {
    return {
        updateCurrentUser: updateCurrentUser
    };

    function updateCurrentUser(newUserData) {
        var dfd = $q.defer();

        var clone = angular.copy(identity.currentUser);
        angular.extend(clone, newUserData);
        clone.$update().then(function() {
            identity.currentUser = clone;
            dfd.resolve();
        }, function(response) {
            console.log('Here');
            dfd.reject(response.data.reason)
        });
        return dfd.promise;
    }
}