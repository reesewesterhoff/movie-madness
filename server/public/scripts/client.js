console.log('client js loaded');
const movieApp = angular.module('MovieApp', ['ngRoute']);

movieApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as vm'
    }).when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddController as vm'
    }).when('/manage', {
        templateUrl: 'views/manage.html',
        controller: 'ManageController as vm'
    }).when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesController'
    }).otherwise({
        template: '<h1>404</h1>'
    });
}]);