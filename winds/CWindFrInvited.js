	
	"use strict";

	let CWindFrInvited = {};
	
	CWindFrInvited.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindFrInvited.startup = function( params ){
		let self = this;
		this.mainGroup = Handler.newGroup();
		this.mainGroup.x = Handler.contentCenterX;
		this.mainGroup.y = Handler.contentCenterY;
		
		this.backgr = Handler.showImgRect(this.mainGroup,"backgrAcInvite.png",0,0,662,521);
		this.backgrSmoll = Handler.showImgRect(this.mainGroup,"backgrSmoll.png",0,10,599,442);
		
		this.cross = Handler.showImgRect(this.mainGroup, "cross.png",310,-236,36,36);
		let onCross = function(evt){
			self.shutdown();
		};
		this.cross.onEL("pointertap",onCross);
		
		this.luch1 = Handler.showImgRect(this.mainGroup, "luch.png",0,0,501,501);
		this.luch1.alpha = 0.35;
		this.luch2 = Handler.showImgRect(this.mainGroup, "luch.png",0,0,501,501);
		this.luch2.alpha = 0.35;
		TweenMax.to( this.luch1, 10, { angle:  360, ease: Power0.easeNone, repeat: -1 } );
		TweenMax.to( this.luch2, 10, { angle: -360, ease: Power0.easeNone, repeat: -1 } );
		
		Handler.showImgRect(this.mainGroup, "lableTitle.png",0,-160,562,78);
		Handler.showImgRect(self.mainGroup, "bonAcInvite.png",0,-61,270,97);
		this.butGold = Handler.showImgRect(this.mainGroup, "butGold.png",0,25,443,60);
		Handler.showImgRect(this.mainGroup, "lableMidline.png",0,100,367,66);
		Handler.showImgRect(this.mainGroup, "butInviteWindFrInvited.png",0,165,443,61);
		Handler.showImgRect(this.mainGroup, "lableTellFrDailyBonus.png",195,220,196,17);
		Handler.showImgRect(this.mainGroup, "checkBoxDailyBonus.png",85,216,19,19);
		Handler.showImgRect(this.mainGroup, "markerDailyBonus.png",87,216,29,23);
		
		return self.mainGroup;
	};
	
	CWindFrInvited.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};