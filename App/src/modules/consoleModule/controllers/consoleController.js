'use strict';
angular.module('console').controller('consoleController',function($scope){

	var consoleController=
	{
		init:function(){
			$scope.buttonLabel='show console';
			$scope.showConsole=false;
			$scope.items=[];
			$scope.onClick=this.onClick.bind(this);

			var old = console.log;
			console.log = function(){
				$scope.items.push(arguments[0]+arguments[1]);
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
				old.apply(this, arguments)
			}
			console.error = function(){
				$scope.items.push(arguments[0]+arguments[1]);
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
				old.apply(this, arguments)
			}
			console.warn = function(){
				$scope.items.push(arguments[0]+arguments[1]);
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
				old.apply(this, arguments)
			}
			console.info = function(){
				$scope.items.push(arguments[0]+arguments[1]);
				if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
				old.apply(this, arguments)
			}
		},
		onClick:function(){
			if(!$scope.showConsole)
			{
				$scope.showConsole=true;
				$scope.buttonLabel='hide console';
				
			}else{
				$scope.showConsole=false;
				$scope.buttonLabel='show console';
			}
		}


	};

	consoleController.init();

	return consoleController;

});
