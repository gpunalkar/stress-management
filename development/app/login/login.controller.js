(function(){
'use strict';
	var StressRootModule = angular.module('StressRootModule');

    StressRootModule.controller('LoginController', LoginController);

    LoginController.$inject=['$scope', 'CONSTANT','LoginService','$cookies','$state'];

/**
     * LoginController is a controller that show Admin dashboard
     * @namespace StressRootModule
     * @class loginController
     * @constructor
     * @param $scope is angular scope
     * @param CONSTANT is angular CONSTANT
     * @param LoginService is custom service use for validate credentials
     */
    function LoginController($scope, CONSTANT, LoginService, $cookies, $state) {
        $scope.isAdmin = false;
        // isadmin = true;
        $scope.message='';

        $scope.validateCreadentials = function(){
            LoginService.validateUser($scope.userName, $scope.password, $scope.isAdmin)
            .then(function(response){
                console.log(response);
                if(!response.data.error){
                    var userInfo = {
                        id: response.data.response.data._id,
                        firstname: response.data.response.data.first_name,
                        lastname: response.data.response.data.last_name,
                        token: response.data.response.data.token,
                    }
                    $cookies.put("_id", response.data.response.data._id);
                    $cookies.put("first_name", response.data.response.data.first_name);
                    $cookies.put("last_name", response.data.response.data.last_name);
                    $cookies.put("token", response.data.response.data.token);
                    // console.log($cookies.getObject("user"));
                    $scope.message = response.data.response.data.first_name + " " + response.data.response.data.last_name + " " + response.data.response.msg;
                    $state.go('home');
                } else {
                    $scope.message = response.data.response.msg;
                }
            }, function(error){
                alert(error);
                    $scope.message = 'Server Error';
            });
        };
    }
})();