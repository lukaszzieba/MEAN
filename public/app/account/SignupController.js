angular
    .module('app')
    .controller('SignupController', SignupController);

SignupController.$inject = ['$scope', 'auth', 'notifier', '$location'];

function SignupController($scope, auth, notifier, $location) {

    $scope.signUp = function() {
        var newUser = {
            username:  $scope.email,
            firstName:  $scope.firstName,
            lastName:  $scope.lastName,
            password:  $scope.password
        };
        auth.createUser(newUser).then(function() {
            notifier.notify('User created successfully!', true);
            $location.path('/');
        }, function(reason) {
            notifier.notify(reason, false);
        })
    }
}