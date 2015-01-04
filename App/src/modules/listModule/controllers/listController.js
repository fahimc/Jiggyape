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
			$scope.$apply();
		},
		onItemClick:function(id){
			console.log('id',id);
		}

	};

	listController.init();

	return listController;

});
