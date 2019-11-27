		
	"use strict";
	
	let CWindAction0 = {};
	
	CWindAction0.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAction0.startup = function( params ) {
		let self = this;
		//throw new Error("asd");
		/*let o = null;
		let b = o.b.c;*/
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		Handler.showImgRect(self.mainGroup, "backgrAcSale.png",0,0,622,575);
		let cross = Handler.showImgRect(self.mainGroup, "cross.png",290,-245,36,36);
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
		Handler.showImgRect(self.mainGroup,"lableBonAcSale.png",0,-165,576,72);
		Handler.showImgRect(self.mainGroup,"backgrBonAcSale.png",0,-60,494,122);
		let xBon = -165;
		for ( let i = 1; i <=  4; i++ ) {			
			let bon = Handler.showImg(self.mainGroup,"bon"+i+"AcSale.png",xBon,-60);
			if ( !isMobile ) {
				bon.width /= 2;
				bon.height /= 2;
			};
			xBon = xBon + bon.width + 30;				
		};
		Handler.showImgRect(self.mainGroup,"lableBuyAcSale.png",0,20,440,33);
		Handler.showImgRect(self.mainGroup,"lable9bonAcSale.png",0,115,553,153);
		
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

		let butBuy = Handler.showImgRect(self.mainGroup,"butBuyAcSale.png",6,228,312,65);
		butBuy.interactive = true;
		butBuy.buttonMode = true;
		butBuy.on("pointerdown", pointerDownButBuy);
		butBuy.on("pointerup", pointerUpButBuy);
		self.mainGroup.interactive = true;
		return self.mainGroup;
	};
	
	CWindAction0.shutdown = function() {
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAction0;