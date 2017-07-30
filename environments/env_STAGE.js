(function(){
    'use strict'
    var EnvConfigModule = angular.module('EnvConfigModule', []);

    var envConfig = {
        BASE_PATH: 'http://stressmanagement.stage'
    }

    EnvConfigModule.constant('__ENV', envConfig);

})();