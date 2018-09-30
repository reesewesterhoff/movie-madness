movieApp.controller('HomeController', ['$http', function($http) {
    let vm = this;
    console.log('running HomeController');
    vm.movieArray = [];

    vm.getFromApi = function () {
        $http({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?api_key=0b68eb50758a2deff51a5daecc8c04fa&`
        }).then(function(response) {
            console.log('from api', response);
            vm.movieArray = response.data.results;
        }).catch(function(error) {
            console.log('error getting movies from api', error);
        });
    }
    
    vm.getFromApi();
}]);