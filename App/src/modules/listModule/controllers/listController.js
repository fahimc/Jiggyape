'use strict';
angular.module('list').controller('listController',function($scope,youtubeService,$rootScope){

	var listController=
	{
		init:function(){
			$scope.onItemClick=this.onItemClick.bind(this);
			$rootScope.$on('RESULTS',this.onResults.bind(this));
		},
		onResults:function(event,data){
			$scope.results = data.results;
			console.log($scope.results);
			 if (!$scope.$$phase) $scope.$apply();
		},
		onItemClick:function(item){
			console.log('item',item);
			$rootScope.$broadcast('ADD_TO_PLAYLIST',{item:item});
		}

	};

	listController.init();

	return listController;

});
