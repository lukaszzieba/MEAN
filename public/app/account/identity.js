angular
    .module('app')
    .factory('identity', identity);

identity.$inject = ['$window', 'mvUser'];

function identity($window, mvUser) {
    var currentUser = new mvUser();
    if (!!$window.bootstrapedUserObj) {
        angular.extend(currentUser, $window.bootstrapedUserObj);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
    };

    function isAuthenticated() {
        // my addon
        if(this.currentUser === undefined ||  !this.currentUser.hasOwnProperty('firstName')) {
            return false;
        } else {
            return !!this.currentUser;
        }
    }

    function  isAuthorized(role) {
        return this.currentUser && this.currentUser.roles.indexOf(role) > -1
    }
}