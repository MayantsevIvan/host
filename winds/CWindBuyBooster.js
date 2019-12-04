	
	"use strict";
	
    let CWindBuyBooster = {};         

    CWindBuyBooster.newObject = function() {          
        let self = this;

        self.winds = {};         

        return self;         
    };         

    CWindBuyBooster.startup = function( params ) {
        let self = this;
        self.mainGroup = Handler.newGroup( Handler.gWinds );         
        self.mainGroup.x = Handler.contentCenterX;         
        self.mainGroup.y = Handler.contentCenterY;         
		let showContent = function() {
			let wBackgr = isMobile ? visibleWidth0 : 588;
			let xBackgr = isMobile ? -225 : -294;
			self.backgr = Handler.showWindBackround( xBackgr, -149, wBackgr, 299, Consts.DIR_BUY_BOOSTER + "angleWindBuyBooster.png", Consts.DIR_BUY_BOOSTER + "sideWindBuyBooster.png", '0xF0ECB6' );
			self.mainGroup.addChild( self.backgr );
			let xCross = isMobile ? 190 : 264;
			let cross = Handler.showImgRect( self.mainGroup,Consts.DIR_BUY_BOOSTER + "crossWindBuyBooster.png", xCross, -119, 33, 28 );
			cross.onEL("pointerdown", function(){ self.shutdown() } ); 
	//STARS ON BACKGROUND
			if ( !isMobile ) {
				let starArray = {};         
				let starCX = [ -225, -120, -190, -225, -120, 120, 225, 190, 120, 225 ];         
				let starCY = [   70,   20,  -30,  -90,  -60,  20,  70, -30, -60, -90 ];  

				for ( let i = 0; i<starCX.length; i++ ) {
					starArray[i] = Handler.showImgRect( self.mainGroup, "star.png", starCX[i], starCY[i], 38, 37);         
					Handler.transition_to( starArray[i], { angle:90, time: Consts.TIME_ROT_START, repeat: 18, yoyo: true  } );         
				};
			};
	//LIGHTNING
			let backgrAnim = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_BOOSTER + "animBackgr.png",0,-20,124,153);         
			let luch1 = Handler.showImgRect( self.mainGroup, "luch.png", backgrAnim.x,backgrAnim.y,160,160 );         
			let luch2 = Handler.showImgRect( self.mainGroup, "luch.png", backgrAnim.x,backgrAnim.y,160,160 ); 
			luch1.alpha = 0.4;
			luch2.alpha = 0.4;
			const ltime = Consts.TIME_ROT_LUCH_BUY_BOOSTER*3;//33000;
			Handler.transition_to( luch1, { angle:-360*5, time:ltime } );         
			Handler.transition_to( luch2, { angle: 360*5, time:ltime } );   
	/////////////////////////////
			let numBonus = parseInt( Consts.BONUSES_NAMES.indexOf( params.nameBon ) )+1; 
			//let numBonus = parseInt( params.nameBon.substr(3) ); 

			let wBon = [ 0, 163,139,153,141,139,165 ];         
			let hBon = [ 0, 139,171,153,144,144,139 ];         
			let xBon = [ 0,  -8,  0, -8,  1, -1,  0 ];         

			let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_BOOSTER + "but.png", 0, 100, 363, 49 );
			let onButBuy = function() {
				//['bGL','bVL','bPL','bMX','bMT','bCH']; 
				if ( numBonus < 1 || numBonus > 6 ) return;
				let costs = [31,30,32,35,33,34];
				let codes = [13,12,14,19,15,16];
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(); };
				SocialClient.Payment( codes[numBonus-1], Langs["payNameBon"+numBonus],  costs[numBonus-1] );
				Handler.addBooster(numBonus-1);
				self.shutdown();      
			};        
			butBuy.onEL( "pointerdown", onButBuy );         

			//Handler.showImgRect( self.mainGroup, Consts.DIR_BUY_BOOSTER+params.nameBon+".png", xBon[numBonus], -25, wBon[numBonus], hBon[numBonus] );         
			Handler.showImgRect( self.mainGroup, Consts.DIR_BUY_BOOSTER + params.nameBon+".png", -8, -25, 154, 155 );         
			Handler.showImgRect( self.mainGroup, Consts.DIR_BUY_BOOSTER + "price"+numBonus+".png", 70, 102, 48, 36, false );         
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_BOOSTER ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_BOOSTER ] = 1;
			let listOfImages = [
				"winds/buyBooster/crossWindBuyBooster.png",
				"winds/buyBooster/price1.png",
				"winds/buyBooster/price2.png",
				"winds/buyBooster/price3.png",
				"winds/buyBooster/angleWindBuyBooster.png",
				"winds/buyBooster/sideWindBuyBooster.png",
				"winds/buyBooster/animBackgr.png",
				"winds/buyBooster/bPL.png",
				"winds/buyBooster/bMX.png",
				"winds/buyBooster/bMT.png"];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};

        return self.mainGroup;         
    };         

    CWindBuyBooster.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};
    