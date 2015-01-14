'use strict';

app.controller('appController', function ($scope, $rootScope,youtubeService) {
	$scope.appName = 'Jiggyape';
	var ready=[];
	$rootScope.$on('YoutubePlayerLoaded',function(){
		ready.push(true);
		check();
	});
	$rootScope.$on('YoutubeLoaded',function(){
		ready.push(true);
		check();
	});
	function check(){
		if(ready.length>1){
			$scope.appReady=true;
			if (!$scope.$$phase) $scope.$apply();
		}
	}
})
