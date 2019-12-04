		
	"use strict";
	
	let CWindAction0 = {};
	
	CWindAction0.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAction0.startup = function( params ) {
		let self = this;
		let showContent = function() {
			//throw new Error("asd");
			/*let o = null;
			let b = o.b.c;*/
			self.mainGroup = Handler.newGroup();
			self.mainGroup.x = Handler.contentCenterX;
			self.mainGroup.y = Handler.contentCenterY;
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrAcSale.png",0,0,544,556);
			let cross = Handler.showImgRect(self.mainGroup, "cross.png",246,-254,36,36);
			let onCross = function(evt) {
				self.shutdown();
			};
			cross.onEL("pointertap", onCross);
			let luch1  = Handler.showImgRect(self.mainGroup,"luch.png",0,0,561,548);
			luch1.alpha = 0.35;
			let luch2  = Handler.showImgRect(self.mainGroup,"luch.png",0,0,561,548);
			luch2.alpha = 0.35;
			TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
			TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "head.png",0,-260,403,65);
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "lableBonAcSale.png",0,-178,320,106);
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrBonAcSale.png",-2,-70,493,102);
			let xBon = -162;
			for ( let i = 1; i <=  4; i++ ) {			
				let bon = Handler.showImg(self.mainGroup, Consts.DIR_ACTION0 + "bon"+i+"AcSale.png",xBon,-70);
				if ( !isMobile ) {
					bon.width /= 2;
					bon.height /= 2;
				};
				xBon = xBon + bon.width + 30;				
			};
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "lableBuyAcSale.png",0,0,440,33);
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrLableInfoAc.png",0,94,493,152);
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "lableInfoAc.png",0,94,464,127);
			
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
				console.log(evt.target.name);	
			};
			
			let pointerUpButBuy = function( evt ) {
				SocialClient.callbackPayment = Handler.getUserSrvData;
				SocialClient.Payment( 18, Langs.payNameAct90,  90 );
				self.shutdown();
			};
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrButBuy.png",0,218,311,69);
			let butBuy = Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "butBuyAcSale.png",0,212,312,65);
			butBuy.onEL("pointerdown", pointerDownButBuy);
			butBuy.onEL("pointerup", pointerUpButBuy);
			if ( isMobile ) self.mainGroup.scale.set( visibleWidth/self.mainGroup.width );
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACTION0 ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACTION0 ] = 1;
			let listOfImages = [
				"winds/acSale/backgrAcSale.png",
				"winds/acSale/backgrBonAcSale.png",
				"winds/acSale/backgrButBuy.png",
				"winds/acSale/backgrLableInfoAc.png",
				"winds/acSale/bon1AcSale.png",
				"winds/acSale/bon2AcSale.png",
				"winds/acSale/bon3AcSale.png",
				"winds/acSale/bon4AcSale.png",
				"winds/acSale/butBuyAcSale.png",
				"winds/acSale/head.png",
				"winds/acSale/lableBonAcSale.png",
				"winds/acSale/lableBuyAcSale.png",
				"winds/acSale/lableInfoAc.png"];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindAction0.shutdown = function() {
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAction0;