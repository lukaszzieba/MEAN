angular
    .module('app')
    .factory('mvUser', mvUser);


mvUser.$inject = ['$resource'];

function mvUser($resource) {
    var UserResource =  $resource('/api/users/:id', {_id: '@id'});

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin')  >  -1;
    }

    return UserResource;
}