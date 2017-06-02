(function(){
    'use strict';
    var EnvConfigModule = angular.module('EnvConfigModule', []);

    var envConfig = {
        BASE_PATH: 'http://stage.stressmanagement.com'
    };

    EnvConfigModule.constant('__ENV', envConfig);

})();