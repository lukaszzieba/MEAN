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
        isAuthenticated: isAuthenticated
    };

    function isAuthenticated() {
        // my addon
        if(!this.currentUser.firstName){
            return false;
        }
        return !!this.currentUser;
    }
}