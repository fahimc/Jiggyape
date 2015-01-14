'use strict';
angular.module('playlist').controller('playlistController',function($scope,$rootScope,youtubePlayerService){

	var playlistController=
	{
		currentIndex:0,
		init:function(){
			$scope.items=[];
			$scope.itemClass=[];
			$scope.playItem=this.playItem;
			$scope.removeItem=this.removeItem;
			$rootScope.$on('ADD_TO_PLAYLIST',this.onAdd.bind(this));
			$rootScope.$on('PlayingVideo',this.onPlaying.bind(this));

		},
		onPlaying:function(event,data){
			$scope.itemClass[this.currentIndex]="";
			this.currentIndex=data.index;
			$scope.itemClass[this.currentIndex]="selected";
			console.log('this.currentIndex',data);
			if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
		},
		onAdd:function(event,data){
			console.log(data);
			$scope.items.push(data.item);
			youtubePlayerService.updatePlaylist($scope.items);
			 //if (!$scope.$$phase) $scope.$apply();
		},
		playItem:function(index){
			console.log('play');
			youtubePlayerService.playVideo(index);
		},
		removeItem:function(index,$event){
			 $scope.items.splice(index, 1);
			console.log('remove');
			 youtubePlayerService.updatePlaylist($scope.items);
			 youtubePlayerService.playVideo(index);

			 $event.preventDefault();
			 $event.stopPropagation();
		}


	};

	playlistController.init();

	return playlistController;

});
