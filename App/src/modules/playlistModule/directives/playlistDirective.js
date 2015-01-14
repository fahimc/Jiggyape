'use strict';

angular.module('playlist').directive('playlist', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'src/modules/playlistModule/templates/playlist.html',
		scope: {

		},
		controller: 'playlistController'
	}
});
