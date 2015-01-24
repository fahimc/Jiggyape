'use strict';
angular.module('nav').controller('navController',function($scope,youtubeService){

	var navController=
	{
		init:function(){
			$scope.onKey=this.onKey.bind(this);
		},
		onKey:function($event){
			if($event.keyCode==13)
			{
				if($scope.isMobile)$scope.mobileView="search";
				youtubeService.search($scope.searchValue,this.onResults.bind(this));
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
			}

		},
		onResults:function(results){
			console.log(results);
		}


	};

	navController.init();

	return navController;

});
