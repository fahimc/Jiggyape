'use strict';

angular.module('console').directive('console', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'src/modules/consoleModule/templates/console.html',
		scope: {

		},
		controller: 'consoleController'
	}
});
