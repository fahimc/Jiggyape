angular.module('app').directive('appView', function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/modules/appModule/templates/app.html'
    };

});