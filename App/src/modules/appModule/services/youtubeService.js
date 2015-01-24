'use strict';
angular.module('app').factory('youtubeService',function($rootScope){

	var youtubeService=
	{
		OAUTH2_CLIENT_ID : '466692777175-fefe15fi3ltau8bqvdtdprr2pdc2os55.apps.googleusercontent.com',
		OAUTH2_SCOPES : [
		'https://www.googleapis.com/auth/youtube'
		],
		resultsCollection:null,
		authCallback:null,
		init:function(){
			if(!window.youtubeReady)
			{
				window.googleApiClientReady=this.googleApiClientReady.bind(this);
			}else{
				this.googleApiClientReady();
			}
		},
		googleApiClientReady:function(){
			gapi.auth.init(function() {
				window.setTimeout(youtubeService.checkAuth.bind(youtubeService), 1);
			});
		},
		checkAuth:function() {
			
			gapi.auth.authorize({
				client_id: this.OAUTH2_CLIENT_ID,
				scope: this.OAUTH2_SCOPES,
				immediate:true
			}, this.handleAuthResult.bind(this));
			
		},
		handleAuthResult:function(result){
			if(result && result.error)
			{
				this.authCallback();
				/*gapi.auth.authorize({
					client_id: this.OAUTH2_CLIENT_ID,
					scope: this.OAUTH2_SCOPES,
					immediate:false
				}, this.handleAuthResult.bind(this));*/
			}else{
				gapi.client.load('youtube', 'v3',this.onYoutubeLoaded);
				
			}
		},
		manualAuth:function(){
			gapi.auth.authorize({
					client_id: this.OAUTH2_CLIENT_ID,
					scope: this.OAUTH2_SCOPES,
					approval_prompt: 'auto',
					authuser: -1
				}, this.handleAuthResult.bind(this));
		},
		onYoutubeLoaded:function(){
			console.log('onYoutubeLoaded');
			$rootScope.$broadcast('YoutubeLoaded');
		},
		search:function(value,callback){
			var request = gapi.client.youtube.search.list({
				q: "music+"+value,
				part: 'snippet',
				type:'video',
				videoEmbeddable:true,
				maxResults:50
			});

			request.execute(function(response) {
				//youtubeService.resultsCollection =response.result; 
				//console.log("response",response);
				$rootScope.$broadcast('RESULTS',{results:response.result.items});
				//callback(response.result);
			});
		}


	};

	youtubeService.init();

	return youtubeService;

});
