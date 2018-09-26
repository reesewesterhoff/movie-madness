console.log('client js loaded');
const movieApp = angular.module('MovieApp', []);

movieApp.controller('MovieController', [function() {
    let vm = this;
    console.log('running MovieController');
    vm.message = 'taco';

}]);