(function(){
'use strict';
	var StressRootModule = angular.module('StressRootModule');
    var constantObject = {
//        BASE_PATH: 'http://localhost:8001',
        END_POINTS: {
            LOGIN: '/login'
        },
        SECRET : 'abcdefg',
        LOGOUT : '/logout'
    };

    StressRootModule.constant('CONSTANT', constantObject);

})();
