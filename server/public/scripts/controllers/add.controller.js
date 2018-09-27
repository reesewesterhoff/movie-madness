movieApp.controller('AddController', ['$http', function($http) {
    let vm = this;
    console.log('running AddController');
    vm.movieToSend = {};
    vm.movieArray = [];

    vm.addMovie = function () {
        console.log(vm.movieToSend);
        $http({
            method: 'POST',
            url: '/add',
            data: vm.movieToSend
        }).then(function(response) {
            console.log('post request to server to add movie', response);
            vm.movieToSend = {};
        }).catch(function(error) {
            console.log('error posting new movie to server', error);
        });
    }

    vm.getMovies = function () {
        $http({
            method: 'GET',
            url: '/add'
        }).then(function(response) {
            console.log('back from server with movies', response.data);
            vm.movieArray = response.data.map(function(movie) {
                movie.release_date = moment(movie.release_date).format("MMM Do YYYY"); 
                movie.run_time = moment.duration(movie.run_time).hours() + ' hr ' + moment.duration(movie.run_time).minutes() + ' mins';
                return movie;
            });
        }).catch(function(error) {
            console.log('error getting movies from server', error);
        });
    }


    vm.getMovies();
}]);