angular
    .module('app')
    .controller('AccountController', AccountController);

MainController.$inject = ['$scope', '$location' , 'notifier', 'auth', 'identity'];

function AccountController($scope, $location, notifier, auth, identity) {

    $scope.user = {};
    $scope.identity = identity;

    $scope.signIn = function () {
        auth.authenticateUser($scope.user.username, $scope.user.password)
            .then(function (success) {
                if (success) {
                    notifier.notify('You have successfully signed in', true);
                } else {
                    notifier.notify('Username/Password combination incorrect', false);
                }
            });
    }

    $scope.lobOut = function() {
        auth.logOutUsrer()
            .then( function ()
            {
                $scope.user.username = '';
                $scope.user.password = '';
                notifier.notify("You have been successfully signed out", true);
                $location.path('/');
            });
    }
}