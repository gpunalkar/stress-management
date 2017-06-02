(function(){
    'user strict';
    var StressRootModule = angular.module('StressRootModule');

    StressRootModule.service('HomeService', homeServiceHandler);

    homeServiceHandler.$inject = ['$http','CONSTANT', '$q', '__ENV'];

/**
     * homeServiceHandler is a service that show Admin dashboard
     * @namespace StressRootModule
     * @class homeServiceHandler
     * @param $http is protocol
     * @param CONSTANT is angular CONSTANT
     */

    function homeServiceHandler($http, CONSTANT, $q, __ENV){


        this.logout = function(userid, token){
            return $q(function(resolve, reject){
                this.url = __ENV.BASE_PATH + CONSTANT.LOGOUT;
                this.dataObj = {
                };
                this.opt = {
                    headers: {
                        'Content-Type': 'application/json',
                        'locale': 'en',
                        'accesstoken': token,
                        'userid': userid
                    }
                };
                // console.log('this.url');
                // console.log(this.url);
                // console.log(this.opt);
               $http.get(this.url, this.opt)
               .then(function(response){
                    console.log(response);
                    resolve(response.data.response);
               }, function(error){
                    reject(error);
               })

            });

        }
    }
})();