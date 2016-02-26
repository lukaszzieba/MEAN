angular
    .module('app')
    .controller('MainController', MainController);

MainController.$inject = ['$scope'];

function MainController($scope) {
    $scope.courses = [
        {name: 'C# for Sociopaths', featured: true, published: new Date() },
        {name: 'JADE engine', featured: true, published: new Date() },
        {name: 'Mongo db for Beginers', featured: true, published: new Date() },
        {name: 'Express App', featured: true, published: new Date() },
        {name: 'NodeJS', featured: true, published: new Date() },
        {name: 'C++ for Sociopaths', featured: false, published: new Date() },
        {name: 'Scala for Sociopaths', featured: false, published: new Date() },
        {name: 'JavaScript for Sociopaths', featured: false, published: new Date() },
        {name: 'Ember for Sociopaths', featured: false, published: new Date() },
        {name: 'Understanding JS', featured: false, published: new Date() }
    ];
}
