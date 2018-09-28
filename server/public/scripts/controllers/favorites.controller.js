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

    vm.deleteMovie = function (movieID) {

        // Appending dialog to document.body to cover sidenav in docs app
        let confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this title?')
            .textContent('You cannot undo this action')
            .ariaLabel('Lucky day')
            .targetEvent(movieID)
            .ok('Yes!')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'DELETE',
                url: `/favorites/${movieID}`
            }).then(function (response) {
                vm.getFavorites();
            }).catch(function (error) {
                console.log('error deleting movie from server', error);
            });
            $mdToast.show($mdToast.simple().textContent('Movie successfully deleted!'));
        }, function () {
        });

        
    }

    vm.getFavorites();
}]);