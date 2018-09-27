movieApp.controller('ManageController', [function() {
    let vm = this;
    console.log('running ManageController');
    vm.genreToAdd = {};
    vm.genreArray = [];

    vm.addGenre = function () {
        $http({
            method: 'POST',
            url: '/manage',
            data: vm.genreToAdd
        }).then(function(response) {
            console.log('genre post back from server with', response);
            vm.genreToAdd = {};
        }).catch(function(error) {
            console.log('error posting new genre to server', error);
        });
    }

}]);
