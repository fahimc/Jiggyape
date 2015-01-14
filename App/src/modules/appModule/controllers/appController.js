'use strict';

app.controller('appController', function ($scope, $rootScope,youtubeService,youtubePlayerService) {
	$scope.appName = 'Jiggyape';
	$rootScope.needAuth = false;
	var ready=[];
	youtubeService.authCallback=needAuthCallback;
	$scope.onAuthClick=function(){
		youtubeService.manualAuth();
	}

	function needAuthCallback(){
		console.log('needAuth');
		$rootScope.appReady=false;
		$rootScope.needAuth=true;
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

	$scope.playVideo=function(){
		youtubePlayerService.playVideo(youtubePlayerService.index);
	};

	$scope.nextVideo=function(){
		youtubePlayerService.nextVideo();
	};
	$scope.previousVideo=function(){
		youtubePlayerService.previousVideo();
	};
	function check(){
		if(!$rootScope.needAuth && ready.length>1){
			$rootScope.appReady=true;
			if (!$scope.$$phase) $scope.$apply();
		}
	}
})
