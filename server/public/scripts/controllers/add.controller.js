movieApp.controller('AddController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
    let vm = this;
    vm.movieToSend = {};
    vm.movieArray = [];
    vm.genreArray = [];
    vm.status = '';

    vm.addMovie = function () {
        $http({
            method: 'POST',
            url: '/add',
            data: vm.movieToSend
        }).then(function (response) {
            vm.movieToSend = {};
            vm.getMovies();
        }).catch(function (error) {
            console.log('error posting new movie to server', error);
        });
    }

    vm.getMovies = function () {
        $http({
            method: 'GET',
            url: '/add'
        }).then(function (response) {
            vm.movieArray = response.data.map(function (movie) {
                movie.release_date = moment(movie.release_date).format("MMM Do YYYY");
                movie.run_time = moment.duration(movie.run_time).hours() + ' hr ' + moment.duration(movie.run_time).minutes() + ' mins';
                return movie;
            });
        }).catch(function (error) {
            console.log('error getting movies from server', error);
        });
    }

    vm.deleteMovie = function (movieID) {

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this title?')
            .textContent('You cannot undo this action')
            .ariaLabel('Lucky day')
            .targetEvent(movieID)
            .ok('Fuck yeah!')
            .cancel('Mommy I\'m scared');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'DELETE',
                url: `/add/${movieID}`
            }).then(function (response) {
                vm.getMovies();
            }).catch(function (error) {
                console.log('error deleting movie from server', error);
            });
            $mdToast.show($mdToast.simple().textContent('Movie successfully deleted!'));
        }, function () {
        });

        
    }

    vm.getGenres = function () {
        $http({
            method: 'GET',
            url: '/manage'
        }).then(function (response) {
            vm.genreArray = response.data;
        }).catch(function (error) {
            console.log('error getting genres from server', error);
        });
    }

    vm.getGenres();
    vm.getMovies();
}]);