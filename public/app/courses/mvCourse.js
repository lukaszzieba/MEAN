angular
    .module('app')
    .factory('mvCourse', function ($resource) {
        var CourseResource = $resource('/api/course/:id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });

        return CourseResource;
    });