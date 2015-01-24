'use strict';

angular.module('list').directive('list', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'src/modules/listModule/templates/list.html',
		scope: {
			mobileView:"=",
			isMobile:"="
		},
		controller: 'listController'
	}
});
