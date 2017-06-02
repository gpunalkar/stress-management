(function(){
    'user strict';
    var StressRootModule = angular.module('StressRootModule');

    StressRootModule.service('LoginService', loginServiceHandler);

    loginServiceHandler.$inject = ['$http','CONSTANT','$q', '__ENV'];

/**
     * loginServiceHandler is a service that show Admin dashboard
     * @namespace StressRootModule
     * @class loginServiceHandler
     * @constructor
     * @param $http is protocol
     * @param CONSTANT is angular CONSTANT
     * @param $q is to validate promise
     */

    function loginServiceHandler($http, CONSTANT, $q, __ENV){
        this.validateUser = function(uname, pwd, isadmin){

            return $q(function(resolve, reject){
                var encryptedPassword = CryptoJS.AES.encrypt(pwd, CONSTANT.SECRET).toString();
                this.url = __ENV.BASE_PATH + CONSTANT.END_POINTS.LOGIN;
                // console.log('encryptedPassword');
                // console.log(encryptedPassword);
                this.dataObj = {
                    "email_id" : uname,
                    "password" : encryptedPassword,
                    "isadmin" : isadmin
                };
                this.opt = {
                    headers: {
                        'Content-Type': 'application/json',
                        'locale': 'en'
                    }
                };
                $http.post(this.url, this.dataObj, this.opt)
                .then(function(response){
                    // console.log('response');
                    // console.log(response.data);
                    resolve(response);
                }, function(error){
                    console.log('error');
                    console.log(error);
                    reject(error);
                });
            });
        };
    }
})();