angular
    .module('app', ['ngResource', 'ngRoute'])
    .config(config)
    .controller('mainCtrl', mainCtrl);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $routeProvider.when('/', {templateUrl: '/partials/main', controller: 'mainCtrl'});
}

mainCtrl.$inject = ['$scope'];

function mainCtrl($scope) {
    $scope.myVar = 'hello angular';
}


