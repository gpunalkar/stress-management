/**
* Top level module of the Stress management App.
* 
* @module StressRootModule
* @requires ui.router, ngCookies, ui.bootstrap
*/
(function(){
    'use strict'
    var StressRootModule = angular.module("StressRootModule", ['ui.router', 'EnvConfigModule', 'ngCookies']);

    StressRootModule.config(configHandler);
    StressRootModule.config(runHandler);

    configHandler.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];
    runHandler.$inject = [];

    function configHandler($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('/login', {
            'url': '/login',
            'templateUrl': 'app/login/login.html',
            'controller': 'LoginController'
        })
        $stateProvider.state('/home', {
            'url': '/home',
            'templateUrl': 'app/home/home.html',
            'controller': 'HomeController'
        })
        $stateProvider.state('/changepassword', {
            'url': '/changepassword',
            'templateUrl': 'app/change-password/changePassword.html',
            'controller': 'ChangePasswordController'
        })
        $stateProvider.state('/forgetpassword', {
            'url': '/forgetpassword',
            'templateUrl': 'app/forget-password/forgetPassword.html',
            'controller': 'ForgetPasswordController'
        })

        $httpProvider.interceptors.push('ServiceManager');
        console.log('configHandler');
    };

    function runHandler() {
        console.log('runHandler');
    };
})();