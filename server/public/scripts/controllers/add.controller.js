movieApp.controller('AddController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
    let vm = this;
    // movie object defaults thumbs up, down, and favorite to false
    vm.movieToSend = {
        thumbs_down: false,
        thumbs_up: false,
        favorite: false
    };
    vm.movieArray = [];
    vm.genreArray = [];
    vm.favoritesArray = [];

    //post request to server to create new movie
    vm.addMovie = function () {
        $http({
            method: 'POST',
            url: '/add',
            data: vm.movieToSend
        }).then(function (response) {
            vm.movieToSend = {
                thumbs_down: false,
                thumbs_up: false,
                favorite: false
            };
            vm.getMovies();
            $mdToast.show($mdToast.simple().textContent('Movie successfully added to My Movies!'));
        }).catch(function (error) {
            console.log('error posting new movie to server', error);
        });
    }

    // get request to server for all movies
    vm.getMovies = function () {
        $http({
            method: 'GET',
            url: '/add'
        }).then(function (response) {
            // moment.js to format release date and run time
            vm.movieArray = response.data.map(function (movie) {
                movie.release_date = moment(movie.release_date).format("M/D/YYYY");
                movie.run_time = moment(movie.run_time, 'hh:mm:ss').format('h:mm');
                return movie;
            });
        }).catch(function (error) {
            console.log('error getting movies from server', error);
        });
    }

    // delete request to server, delete by id
    vm.deleteMovie = function (movieID) {

        // $mdDialog to confirm deletion
        let confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this title?')
            .textContent('You cannot undo this action')
            .ariaLabel('Lucky day')
            .targetEvent(movieID)
            .ok('Yes!')
            .cancel('Cancel');
        // confirm delete
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
    
    // get genres for dropdown genre menu
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

    // add movie to favorites page, trying to use for loop to avoid duplicate favorites, not working
    vm.addToFavorites = function (movie) {
        // console.log('this is the movie being added', movie);
        // console.log(vm.favoritesArray);
        //    for(let favoriteMovie of vm.favoritesArray) {
        //        console.log('in for loop');
        //        if(favoriteMovie.id === movie.id) {
        //         $mdToast.show($mdToast.simple().textContent('Movie already in your favorites!'));
        //         return movie;
        //        }
        //        else {
        $http({
            method: 'POST',
            url: '/favorites',
            data: movie
        }).then(function (response) {
            vm.favoritesArray.push(movie);
            $mdToast.show($mdToast.simple().textContent('Movie successfully added to your favorites!'));
        }).catch(function (error) {
            console.log('error posting to favorites', error);
        });
        //        }
        //    }
    }

    // get movies and genres on page load
    vm.getGenres();
    vm.getMovies();
}]);