		
	"use strict";
	
	let Sounds = {};
	Sounds.soundsCache = [];
	
	Sounds.baseURL = 'sounds/';
	Sounds.msOn = true;
	
	Sounds.init = function() {
		document.body.addEventListener("focusout", function(){ if ( Sounds.msOn ) Sounds.Stop(); } );
		document.body.addEventListener("focusin",  function(){ if ( !Sounds.msOn ) Sounds.Play(); } );
		Sounds.Play();
	};
	
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
						if ( key == 'happyday' ) sound.volume = 0.15;
						if ( key == 'boom1small' ) sound.singleInstance = true; 
						if ( key == 'electricity' ) sound.singleInstance = true; 
						if ( key == 'steklo' ) { 
							sound.singleInstance = true; 
							sound.volume = 0.50;
						};
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