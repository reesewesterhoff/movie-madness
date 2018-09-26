movieApp.controller('AddController', ['$http', function($http) {
    let vm = this;
    console.log('running AddController');
    vm.movieToSend = {};
    vm.movieArray = [];

    vm.addMovie = function () {
        $http({
            method: 'POST',
            url: '/add',
            data: vm.movieToSend
        }).then(function(response) {
            console.log('post request to server to add movie', response);
        }).catch(function(error) {
            console.log('error posting new movie to server', error);
        });
    }

}]);