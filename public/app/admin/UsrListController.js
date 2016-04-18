angular
    .module('app')
    .controller('UsrListController', UsrListController);

UsrListController.$inject = ['$scope', 'mvUser'];

function UsrListController($scope, mvUser) {
    $scope.users = mvUser.query();
    console.log($scope.users)
}