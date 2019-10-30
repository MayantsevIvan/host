		
	"use strict";
	
	let CWindAc5Steps = {};
	
	CWindAc5Steps.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAc5Steps.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = 590;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "backgrAc5Steps.png", 0, 0,402,42);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "lableSteps.png",-70,0,252,25);
			let butBuy= Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "butBuyAc5Steps.png",172,0,230,43);
			let onButBuy = function(evt) {

			};
			butBuy.onEL( "pointertap", onButBuy);
			self.mainGroup.interactive = true;
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACT_5_STEPS ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACT_5_STEPS ] = 1;
			let listOfImages = [
				"winds/ac5Steps/backgrAc5Steps.png",
				"winds/ac5Steps/lableSteps.png",
				"winds/ac5Steps/butBuyAc5Steps.png",
			];
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
	}
	
	CWindAc5Steps.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindAc5Steps;