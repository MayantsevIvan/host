	
	"use strict";
	
	let CWindAcSale1 = {};
	
	CWindAcSale1.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "backgrAcSale1.png",0,0,641,366);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "lableAcSale1.png",0,-110,580,75);
			let but = Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "butBuyAcSale1.png",-80,125,281,69);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "lableBonAcSale1.png",-90,10,354,142);
			let cross = Handler.showImgRect(self.mainGroup, "cross.png",300,-160,36,36);
			let onCross = function(evt) {
				self.shutdown();
			}
			cross.on("pointertap",onCross);
			let onBut = function(evt) {

			};
			but.on("pointertap", onBut);
		
			let backgrAnim = Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "backgrAnimAcSale1.png",185,35,164,205);
			let luch1 = Handler.showImgRect(self.mainGroup, "luch.png",185,35,200,200);
			luch1.alpha = 0.7;
			let luch2 = Handler.showImgRect(self.mainGroup, "luch.png",185,35,200,200);
			luch2.alpha = 0.7;
			TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
			TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "bon1AcSale1.png",185,35,135,150);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "bon2AcSale1.png",125,-45,60,61);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_SALE1 + "bon3AcSale1.png",125,115,63,63);
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACTION1 ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACTION1 ] = 1;
				let listOfImages = [
					"winds/acSale1/backgrAcSale1.png",
					"winds/acSale1/lableAcSale1.png",
					"winds/acSale1/butBuyAcSale1.png",
					"winds/acSale1/lableBonAcSale1.png",
					"winds/acSale1/backgrAnimAcSale1.png",
					"winds/acSale1/bon1AcSale1.png",
					"winds/acSale1/bon2AcSale1.png",
					"winds/acSale1/bon3AcSale1.png",
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		
		return self.mainGroup();
	};
	
	CWindAcSale1.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindAcSale1;