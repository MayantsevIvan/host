	
	"use strict";
	
	let CWindSmallAcInv = {};
	
	CWindSmallAcInv.newObject = function(){
		this.wind = {};
		return this;
	};
	
	CWindSmallAcInv.startup = function( parent ) {
		let self = this;
		self.mainGroup = Handler.newGroup( parent );
		
		if ( isMobile ) {
			self.mainGroup.x = 335;
			self.mainGroup.y = 97;
		} else {
			self.mainGroup.x = 335;
			self.mainGroup.y = 180;
		};
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.WIND_SMALL_ACT_INV + "backgrAcInv.png",0,0,88,245);
			Handler.showImgRect(self.mainGroup, Consts.WIND_SMALL_ACT_INV + "lableAcInv.png",0,-45,83,131);
			Handler.showImgRect(self.mainGroup, Consts.WIND_SMALL_ACT_INV + "bonAcInv.png",0,48,58,56);
			let butInv = Handler.showImgRect(self.mainGroup, Consts.WIND_SMALL_ACT_INV + "butInvite.png",-55,100,201,49);
			let cross = Handler.showImgRect(self.mainGroup, "cross.png",35,-115,22,22);
			let onCross = function(evt) {
				self.shutdown();
			};
			cross.onEL("pointertap", onCross);
			let onButInv = function(evt) {
			
			};
			butInv.on( "pointertap", onButInv );
			self.mainGroup.interactive = true;
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_SMALL_ACT_INV ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_SMALL_ACT_INV ] = 1;
				let listOfImages = [
					"winds/acInvInGame/backgrAcInv.png",
					"winds/acInvInGame/lableAcInv.png",
					"winds/acInvInGame/bonAcInv.png",
					"winds/acInvInGame/butInvite.png",
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindSmallAcInv.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindSmallAcInv;