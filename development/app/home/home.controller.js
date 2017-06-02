(function(){
'use strict';
	var StressRootModule = angular.module('StressRootModule');

    StressRootModule.controller('HomeController', HomeController);

    HomeController.$inject=['$scope', 'CONSTANT', 'HomeService', '$cookies', '$state'];

/**
     * HomeController is a controller that show Admin dashboard
     * @namespace StressRootModule
     * @class HomeController
     * @constructor
     * @param $scope is angular scope
     * @param CONSTANT is angular CONSTANT
     * @param HomeService is custom service use for logout functionality
     * @param cookies to store/get user data
     * @param $state for route
     */
    function HomeController($scope, CONSTANT, HomeService, $cookies, $state) {
            this.userid = $cookies.get('_id');
            this.token = $cookies.get('token');
            if(!this.userid || !this.token){
                $state.go('login');
            }

        $scope.logout = function(){
// console.log('logout');
            this.userid = $cookies.get('_id');
            this.token = $cookies.get('token');
            console.log(this.userid);
            console.log(this.token);
            // if(this.userid && this.token){
                HomeService.logout(this.userid, this.token)
                .then(function(response){
// console.log(response);
                    if(response.data.logout){
                        $cookies.remove('first_name');
                        $cookies.remove('last_name');
                        $cookies.remove('_id');
                        $cookies.remove('token');
                        $state.go('login');
                    }
                }, function(error){
                    console.log(error);
                });
            // }
        }
        // $scope.logout();
    }
})();