movieApp.controller('ManageController', ['$http', function($http) {
    let vm = this;
    console.log('running ManageController');
    vm.genreToSend = {};
    vm.genreArray = [];

    vm.addGenre = function () {
        $http({
            method: 'POST',
            url: '/manage',
            data: vm.genreToSend
        }).then(function(response) {
            console.log('genre post back from server with', response);
            vm.genreToSend = {};
        }).catch(function(error) {
            console.log('error posting new genre to server', error);
        });
    }

}]);
