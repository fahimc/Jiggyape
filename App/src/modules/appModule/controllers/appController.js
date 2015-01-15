'use strict';

app.controller('appController', function ($scope, $rootScope,youtubeService,youtubePlayerService) {
	$scope.appName = 'Jiggyape';
	$scope.needAuth = false;
	$scope.playClass="icon-play";
	var ready=[];
	youtubeService.authCallback=needAuthCallback;
	youtubePlayerService.stateCallback=stateCallback;

	$scope.onAuthClick=function(){
		youtubeService.manualAuth();
	}

	function needAuthCallback(){
		console.log('needAuth');
		$scope.appReady=true;
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
	function stateCallback(state){
		if(state==1){
			$scope.playClass="icon-pause";
		}else{
			$scope.playClass="icon-play";
		}
		$scope.$apply();
	}
	$scope.playPauseVideo=function(){
		if($scope.playClass=="icon-play")
		{
		youtubePlayerService.playVideo(youtubePlayerService.index);
		}else{
			youtubePlayerService.pauseVideo();
		}
	};

	$scope.nextVideo=function(){
		youtubePlayerService.nextVideo();
	};
	$scope.previousVideo=function(){
		youtubePlayerService.previousVideo();
	};
	function check(){
		if( ready.length>1){
			$scope.appReady=false;
			if (!$scope.$$phase) $scope.$apply();
		}
	}
})
