'use strict';
angular.module('player').controller('playerController',function($scope,youtubePlayerService){

	var playerController=
	{
		init:function(){
			youtubePlayerService.init();
		}


	};

	playerController.init();

	return playerController;

});
