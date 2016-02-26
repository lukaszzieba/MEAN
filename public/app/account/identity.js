angular
    .module('app')
    .factory('identity', identity);

function identity() {
    return {
        currentUser:undefined,
        isAuthenticated: isAuthenticated
    };

    function isAuthenticated() {
        return !!this.currentUser;
    }
}