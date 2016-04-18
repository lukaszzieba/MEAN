angular
    .module('app', ['ngResource', 'ngRoute'])
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    var routeRoleCheck = {
        admin: {
            auth: function (auth) {
                return auth.authorizeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function (auth) {
                return auth.authorizeAuthenticateUserForRoute();
            }
        }
    }

    $locationProvider.html5Mode({enabled: true, requireBase: false});
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'MainController'})
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'UsrListController',
            resolve: routeRoleCheck.admin
        })
        .when('/signup', {templateUrl: '/partials/account/signup', controller: 'SignupController'})
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileController',
            resolve: routeRoleCheck.user
        })
        .when('/courses', {
            templateUrl: '/partials/courses/course-list',
            controller: 'CoursesController'
        });
}

angular
    .module('app')
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (evt, current, prev, rejec) {
            if (rejec === 'not authorized') {
                $location.path('/')
            }
        })
    });

