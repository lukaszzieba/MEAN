angular
    .module('app')
    .controller('CoursesController', function ($scope, mvCourse) {
        $scope.courses = mvCourse.query();
    });