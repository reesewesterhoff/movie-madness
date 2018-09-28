movieApp.controller('FavoritesController', ['$http', '$mdDialog', '$mdToast', function($http, $mdDialog, $mdToast) {
    let vm = this;
    console.log('running FavoritesController');
    
    vm.favoritesArray = [];

    vm.getFavorites = function () {
        $http({
            method: 'GET',
            url: '/favorites'
        }).then(function(response) {
            vm.favoritesArray = response.data.map(function (movie) {
                movie.release_date = moment(movie.release_date).format("M/D/YYYY");
                movie.run_time = moment(movie.run_time, 'hh:mm:ss').format('h:mm');
                return movie;
            });
            
        }).catch(function(error) {
            console.log('error getting favorites from server', error);
        });
    }

    vm.getFavorites();
}]);