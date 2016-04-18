angular
    .module('app')
    .controller('ProfileController', function ($scope, auth, identity, notifier, myAuth) {
        console.log(myAuth);
        $scope.email = identity.currentUser.username;
        $scope.firstName = identity.currentUser.firstName;
        $scope.lastName = identity.currentUser.lastName;
        console.log(auth);

        console.log(identity);
        console.log(notifier);
        $scope.Update = function () {

            var newUserData = {
                username: $scope.email,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            };
            if ($scope.password && $scope.password.length > 0) {
                newUserData.password = $scope.password;
            }

            myAuth.updateCurrentUser(newUserData).then(function () {
                notifier.notify('Your user account has been updated', true);
            }, function (reason) {
                notifier.notify(reason, false);
            })

        }


    });