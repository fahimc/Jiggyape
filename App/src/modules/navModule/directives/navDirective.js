'use strict';

angular.module('nav').directive('nav', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'src/modules/navModule/templates/nav.html',
		scope: {

		},
		controller: 'navController'
	}
});
