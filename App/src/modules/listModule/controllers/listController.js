'use strict';
angular.module('list').controller('listController',function($scope,youtubeService,$rootScope){

	var listController=
	{
		init:function(){
			$scope.onItemClick=this.onItemClick.bind(this);
			$scope.hideView=this.hideView.bind(this);
			$rootScope.$on('RESULTS',this.onResults.bind(this));
		},
		onResults:function(event,data){
			$scope.results = data.results;
			 if (!$scope.$$phase) $scope.$apply();
		},
		onItemClick:function(item){
			$rootScope.$broadcast('ADD_TO_PLAYLIST',{item:item});
		},
		hideView:function(){
			if($scope.mobileView=="playlist" && $scope.isMobile)
			{
				return true;
			}else{
				return false;
			}
		}

	};

	listController.init();

	return listController;

});
