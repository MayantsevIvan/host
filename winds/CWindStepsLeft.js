	
	"use strict";
	
	let CWindStepsLeft = {};
	
	CWindStepsLeft.newObject = function() {
        this.wind = {};
        return this;
    };
	
	CWindStepsLeft.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			self.backgr = Handler.showWindBackround( -300, -160, 600, 321, Consts.DIR_STEPS_LEFT + "angleStepsLeft.png", Consts.DIR_STEPS_LEFT + "sideStepsLeft.png",Handler.colorLuaToHex( [240,236,182] , false) )
			self.mainGroup.addChild(self.backgr);
			
			let cross = Handler.showImgRect(self.mainGroup, Consts.DIR_STEPS_LEFT + "crossStepsLeft.png",270,-135, 31,26);
			let onTouch = function(evt) {
				self.shutdown(1);
				if ( Winds.getTopWindName() == Winds.WIND_SMALL_ACT_INV ) {
		//			Winds.getWind().shutdown(0);
					Winds.shutdownTopWind(1);
				};
				if ( Winds.getTopWindName() == Winds.WIND_ACT_5_STEPS ) {
		//			Winds.getWind().shutdown(0);
					Winds.shutdownTopWind(1);
				};
				if ( Winds.getTopWindName() == Winds.WIND_GAME ) {
		//			Winds.getWind().shutdown(0);
					Winds.shutdownTopWind(1);
				};
				clearTimeout( Handler.timerOpenAcInv);
			};
			cross.onEL( 'pointertap',  onTouch);
			let title = Handler.showImgRect(self.mainGroup,Consts.DIR_STEPS_LEFT + "lableStepsLeft.png",-5,0,247,26);
			title.y = cross.y+25;
			
			let bon = Handler.showImgRect(self.mainGroup,Consts.DIR_STEPS_LEFT + "bonFStepsLeft.png",0,-10,103,103);
			TweenMax.to( bon, 2, { width: bon.width*1.4, height: bon.height*1.4, repeat: -1, ease: Power0.easeNone, yoyo: true } );
			let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_STEPS_LEFT + "butBuyStepsLeft.png",0,100,364,50);
			butBuy.name = "butBuy";
			let onBut = function(evt ) {

			};
			butBuy.on("pointertap",onBut);
			self.mainGroup.interactive = true;
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_STEPS_LEFT ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_STEPS_LEFT ] = 1;
			let listOfImages = [
				"winds/stepsLeft/angleStepsLeft.png",
				"winds/stepsLeft/sideStepsLeft.png",
				"winds/stepsLeft/crossStepsLeft.png",
				"winds/stepsLeft/lableStepsLeft.png",
				"winds/stepsLeft/bonFStepsLeft.png",
				"winds/stepsLeft/butBuyStepsLeft.png",
			];
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindStepsLeft.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindStepsLeft;