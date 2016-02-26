angular
    .module('app', ['ngResource', 'ngRoute'])
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $routeProvider.when('/', {templateUrl: '/partials/main/main', controller: 'MainController'});
}




