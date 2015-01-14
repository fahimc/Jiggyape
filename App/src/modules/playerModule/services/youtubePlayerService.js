'use strict';
angular.module('player').factory('youtubePlayerService',function($rootScope){

	var youtubePlayerService=
	{
		player:null,
		playlist:[],
		index:0,
		init:function(){
			if(window.playerReady)
			{
				console.log('ready');
				this.player = new YT.Player('player', {
					videoId: '',
					playerVars: {
						controls: 0,
						autoplay: 1,
						disablekb: 1,
						enablejsapi: 1,
						iv_load_policy: 3,
						modestbranding: 0,
						showinfo: 0
					},events: {
						'onReady': this.onPlayerReady.bind(this),
						'onStateChange': this.onPlayerStateChange.bind(this)
					}
				});
			}
		},
		onPlayerReady:function(event){
			console.log('onPlayerReady');
			$rootScope.$broadcast('YoutubePlayerLoaded');
			if (!$rootScope.$$phase) $rootScope.$apply();
		//	 event.target.playVideo();
	},
	onPlayerStateChange:function(event){
		switch(event.data){
			case 0:
			this.nextVideo();
			break;
		}
	},
	playVideo:function(index){
		this.index=index;
		if(this.index>this.playlist.length-1)this.index=0;
		this.player.loadVideoById(this.playlist[this.index]);
		$rootScope.$broadcast('PlayingVideo',{index:index});
	},
	nextVideo:function(){
		this.index++;
		if(this.index>this.playlist.length-1)this.index=0;
		this.playVideo(this.index);
	},
	previousVideo:function(){
		this.index--;
		if(this.index<0)this.index=this.playlist.length-1;
		this.playVideo(this.index);
	},
	updatePlaylist:function(items){
		this.playlist=[];
		for(var a=0;a<items.length;a++){
			this.playlist.push(items[a].id.videoId);
		}

	},



};



return youtubePlayerService;

});
