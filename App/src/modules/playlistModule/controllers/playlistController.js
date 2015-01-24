'use strict';
angular.module('playlist').controller('playlistController',function($scope,$rootScope,youtubePlayerService){

	var playlistController=
	{
		currentIndex:0,
		init:function(){
			$scope.items=[];
			$scope.itemClass=[];
			$scope.playItem=this.playItem;
			$scope.removeItem=this.removeItem.bind(this);
			$scope.isMobileView=this.isMobileView.bind(this);
			$rootScope.$on('ADD_TO_PLAYLIST',this.onAdd.bind(this));
			$rootScope.$on('PlayingVideo',this.onPlaying.bind(this));

			if(typeof(localStorage) !== "undefined") {
				$scope.items = JSON.parse(localStorage.getItem('JiggyapePlaylist'));
				youtubePlayerService.updatePlaylist($scope.items);			
			} 

		},
		isMobileView:function(){
			if($scope.isMobile && $scope.mobileView!="playlist")
			{
				return true;
			}
			return false;
		},
		onPlaying:function(event,data){
			$scope.itemClass[this.currentIndex]="";
			this.currentIndex=data.index;
			$scope.itemClass[this.currentIndex]="selected";
			//console.log('this.currentIndex',data);
			if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
		},
		onAdd:function(event,data){
			$scope.items.push(data.item);
			youtubePlayerService.updatePlaylist($scope.items);
			this.updateStorage();
		},
		playItem:function(index){
			console.log('play');
			youtubePlayerService.playVideo(index);
		},
		removeItem:function(index,$event){
			$scope.items.splice(index, 1);
			//console.log('remove');
			youtubePlayerService.updatePlaylist($scope.items);
			youtubePlayerService.playVideo(index);
			this.updateStorage();
			$event.preventDefault();
			$event.stopPropagation();
		},
		updateStorage:function(){
			if(typeof(localStorage) !== "undefined") {
				localStorage.setItem('JiggyapePlaylist',JSON.stringify($scope.items));			
			} 
		}


	};

	playlistController.init();

	return playlistController;

});
