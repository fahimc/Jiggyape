'use strict';

angular.module('player').directive('player', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'src/modules/playerModule/templates/player.html',
		scope: {

		},
		controller: 'playerController'
	}
});
