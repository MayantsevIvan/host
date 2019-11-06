		
	"use strict";
	
	let CWindAc5Steps = {};
	
	CWindAc5Steps.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAc5Steps.startup = function( parent ) {
		let self = this;
		self.mainGroup = Handler.newGroup( parent );
		self.mainGroup.x = 0;
		self.mainGroup.y = isMobile ? 200 : 283;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "backgrAc5Steps.png", 0, 0,402,42);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "lableSteps.png",-70,0,252,25);
			let butBuy= Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "butBuyAc5Steps.png",172,0,230,43);
			let cross = Handler.showImgRect( self.mainGroup, "cross.png",285,-20,22,22);
			cross.onEL("pointertap",function(){ self.shutdown() });
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
		return self.mainGroup;
	}
	
	CWindAc5Steps.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAc5Steps;