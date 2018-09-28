movieApp.controller('ManageController', ['$http', '$mdDialog', '$mdToast', function ($http, $mdDialog, $mdToast) {
    let vm = this;
    vm.genreToSend = {};
    vm.genreArray = [];

    vm.addGenre = function () {
        $http({
            method: 'POST',
            url: '/manage',
            data: vm.genreToSend
        }).then(function (response) {
            vm.genreToSend = {};
            vm.getGenres();
        }).catch(function (error) {
            console.log('error posting new genre to server', error);
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

    vm.deleteGenre = function (genre) {
        if (genre.count > 0) {
            $mdToast.show($mdToast.simple().textContent('Cannot delete a genre with active movies!'));
        }
        else {
            let confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this genre?')
                .textContent('You cannot undo this action')
                .ariaLabel('Lucky day')
                .targetEvent(genre)
                .ok('Yes!')
                .cancel('Cancel');

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

    vm.getGenres();

}]);
