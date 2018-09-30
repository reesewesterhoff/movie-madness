movieApp.controller('ManageController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
    let vm = this;
    vm.genreToSend = {};
    vm.genreArray = [];

    // post request to server to make a new genre
    vm.addGenre = function () {
        $http({
            method: 'POST',
            url: '/manage',
            data: vm.genreToSend
        }).then(function (response) {
            vm.genreToSend = {}; // clear input field
            vm.getGenres(); // update page with new genre
        }).catch(function (error) {
            console.log('error posting new genre to server', error);
        });
    }

    // get request to server for all genres on page load
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

    // delete request to server
    vm.deleteGenre = function (genre) {
        if (genre.count > 0) { // cannot delete a genre with active movies
            $mdToast.show($mdToast.simple().textContent('Cannot delete a genre with active movies!'));
        }
        else { // $mdDialog confirm deletion
            let confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this genre?')
                .textContent('You cannot undo this action')
                .ariaLabel('Lucky day')
                .targetEvent(genre)
                .ok('Yes!')
                .cancel('Cancel');

            // delete confirmed
            $mdDialog.show(confirm).then(function () {
                $http({
                    method: 'DELETE',
                    url: `/manage`,
                    params: genre
                }).then(function (response) {
                    vm.getGenres();
                }).catch(function (error) {
                    console.log('error deleting genre from server', error);
                });
                $mdToast.show($mdToast.simple().textContent('Genre successfully deleted!'));
            },
                function () {
                });
        }

    }

    // get all genres on page load
    vm.getGenres();

}]);
