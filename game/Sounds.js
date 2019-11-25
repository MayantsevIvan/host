		
	"use strict";
	
	let Sounds = {};
	Sounds.soundsCache = [];
	
	Sounds.baseURL = 'sounds/';
	Sounds.msOn = true;
	
	Sounds.playBody = function( key, fname, loop ) {
        let self = this;
		if ( this.soundsCache[key] ) {
			this.soundsCache[key].play();
		} else {
			PIXI.sound.Sound.from({
				url: Sounds.baseURL + fname,
				autoPlay: false,
                preload: true,
                loaded: function(err, sound) {
					if ( sound ) {
	            	    self.soundsCache[key] = sound;
                        sound.play();
					}
                },
				loop: loop
			});

		};
	}

	Sounds.Play = function() {
		this.playBody( 'happyday', 'happyday.mp3', true );
		Sounds.msOn = true;
	};//Play
	
	
	Sounds.Stop = function() {
		if (this.soundsCache['happyday'] != null) {
			this.soundsCache['happyday'].stop();
			this.stopElectro();
		};
		Sounds.msOn = false;
	};//Play
	
	Sounds.playElectro = function(){
		if ( !Sounds.msOn ) return;
		this.playBody( 'electricity', 'electricity.mp3' );	
	};
	
	Sounds.stopElectro = function(){
		if ( this.soundsCache['electricity'] != null )
			this.soundsCache['electricity'].stop();
	};
	
	Sounds.playGemBack = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'gemBack', 'gemBack.mp3' );
	};
	
	Sounds.playClick = function(){
		if ( !Sounds.msOn ) return;
		this.playBody( 'click', 'click.mp3' );
	};
	
	Sounds.playLight4 = function(){
		if ( !Sounds.msOn ) return;
		this.playBody( 'light4', 'light4.mp3' );
	};
	
	Sounds.playSingleBoom = function(){
		if ( !Sounds.msOn ) return;
		this.playBody( 'boom1small', 'boom1small.mp3' );
	};
	
	Sounds.playSingleSteklo = function(){
		if ( !Sounds.msOn ) return;
		this.playBody( 'steklo', 'steklo.mp3' );
	};
	
	Sounds.playDzin = function(){
	
	};