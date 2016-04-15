angular
    .module('app')
    .factory('identity', identity);

identity.$inject = ['$window'];

function identity($window) {
    var currentUser;
    if (!!$window.bootstrapedUserObj) {
        currentUser = $window.bootstrapedUserObj;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: isAuthenticated
    };

    function isAuthenticated() {
        return !!this.currentUser;
    }
}