'use strict';

app.controller('appController', function ($scope, $rootScope,youtubeService) {
	$scope.appName = 'Jiggyape';
	$scope.needAuth = false;
	var ready=[];
	youtubeService.authCallback=needAuthCallback;
	$scope.onAuthClick=function(){
		youtubeService.handleAuthResult();
	}

	function needAuthCallback(){
		console.log('needAuth');
		$scope.appReady=false;
		$scope.needAuth=true;
		if (!$scope.$$phase) $scope.$apply();
	}
	$rootScope.$on('YoutubePlayerLoaded',function(){
		ready.push(true);
		check();
	});
	$rootScope.$on('YoutubeLoaded',function(){
		ready.push(true);
		check();
	});
	function check(){
		if(!$scope.needAuth && ready.length>1){
			$scope.appReady=true;
			if (!$scope.$$phase) $scope.$apply();
		}
	}
})
