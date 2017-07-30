(function(){
    'use strict'
    var EnvConfigModule = angular.module('EnvConfigModule', []);

    var envConfig = {
        BASE_PATH: 'http://localhost:8001'
    }

    EnvConfigModule.constant('__ENV', envConfig);

})();