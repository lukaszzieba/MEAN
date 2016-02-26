angular
    .module('app')
    .controller('AccountController', AccountController);

MainController.$inject = ['$scope', 'notifier', 'auth', 'identity'];

function AccountController($scope, notifier, auth, identity) {

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
}