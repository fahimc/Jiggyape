'use strict';

app.controller('appController', function ($scope, $rootScope,youtubeService,youtubePlayerService) {
	$scope.appName = 'Jiggyape';
	$scope.needAuth = false;
	$scope.playClass="icon-play";
	$scope.isMobile=false;
	$scope.windowWidth=0;
	$scope.mobileView='playlist';
	var ready=[];
	youtubeService.authCallback=needAuthCallback;
	youtubePlayerService.stateCallback=stateCallback;
	
	window.addEventListener('resize',onResize);
	document.body.addEventListener('contextmenu',onContextMenu);

	createStorage();
	onResize();

	$scope.onAuthClick=function(){
		youtubeService.manualAuth();
	}

	$scope.mobileTabClass=function(name){
			if($scope.mobileView==name)return 'selected';
			return '';
	}

	$scope.mobileTabClick=function(name){
			$scope.mobileView=name;
	}

	function needAuthCallback(){
		console.log('needAuth');
		$scope.appReady=false;
		$scope.needAuth=true;
		if (!$scope.$$phase) $scope.$apply();
	}
	$rootScope.$on('YoutubePlayerLoaded',function(){
		console.log('YoutubePlayerLoaded');
		ready['player']=true;
		check();
	});
	$rootScope.$on('YoutubeLoaded',function(){
		console.log('YoutubeLoaded');
		ready['api']=true;
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
		if(ready['player'] && ready['api']){
			$scope.appReady=true;
			if (!$scope.$$phase) $scope.$apply();
		}
	}
	function createStorage(){
		if(typeof(localStorage) !== "undefined") {
			var storedList  = localStorage.getItem('JiggyapePlaylist');
			if(!storedList)
				storedList  = localStorage.setItem('JiggyapePlaylist',JSON.stringify([]));
		} 
	}
	function onContextMenu(event){
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
	function onResize(event){

		$scope.windowWidth=window.innerWidth;	
		if(window.innerWidth<=480)
		{
			$scope.isMobile=true;	
		}else{
			$scope.isMobile=false;	
		}
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	}
})
