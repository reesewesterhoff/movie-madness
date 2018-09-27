movieApp.controller('ManageController', ['$http', function ($http) {
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
            alert(`You can't delete a genre that has existing movies connected.`);
        }
        else {
            $http({
                method: 'DELETE',
                url: `/manage`,
                params: genre
            }).then(function (response) {
                vm.getGenres();
            }).catch(function (error) {
                console.log('error deleting genre from server', error);
            });
        }

    }

    vm.getGenres();

}]);
