	
	"use strict";
	
	let CWindDailyBonus = {};
	
	CWindDailyBonus.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindDailyBonus.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		Handler.showImgRect(self.mainGroup, "backgrDailyBonus.png",0,0,662,518);
		let cross = Handler.showImgRect(self.mainGroup, "cross.png",310,-238,36,36);
		let touchCross = function(evt) {
			self.shutdown();
		};
		cross.onEL("pointertap",touchCross);
		
		let starArray = [];
		let starKor_X = [ -240,-98, 80, 285,-190];
		let starKor_Y = [ -130,-80,-90,-115,210];

		for (let i = 0;  i  <= starKor_X.length-1; i++) {
			let star = Handler.showImgRect( self.mainGroup, "star.png", starKor_X[i], starKor_Y[i], 40, 39);
			TweenMax.to( star, Consts.TIME_ROT_START/1000, { angle: 90 , repeat: -1, ease: Power0.easeNone, yoyo: true } );
		};
		
		Handler.showImgRect(self.mainGroup,"lableDailyBonus.png",0,-150,532,107);
		
		let day = params.num_day;
		let xBon = -200;
		for ( let i = 1; i <= 3; i++) {
			Handler.showImgRect(self.mainGroup,"backgrBonDailyBonus.png",xBon,50,186,231);
			let luch1 = Handler.showImgRect(self.mainGroup,"luch.png",xBon,50,229,229);
			luch1.alpha = 0.35;
			let luch2 = Handler.showImgRect(self.mainGroup,"luch.png",xBon,50,229,229);
			luch2.alpha = 0.35;
			TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
			TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
			let vkl = "disBon";
			let bon3 = null;
			if ( day == i  ) vkl = "enBon";
	
			let bon = Handler.showImg(self.mainGroup,vkl+i+"DailyBonus.png",xBon,50);
			bon.width = bon.width/2;
			bon.height = bon.height/2;
			xBon = xBon + 200;
		};
		
		let checkBox = Handler.showImgRect(self.mainGroup, "checkBoxDailyBonus.png",95,215,19,19);
		let mark = Handler.showImgRect(self.mainGroup, "markerDailyBonus.png",100,213,29,23);
		mark.isVisible = false;
		let onCheckBox = function(event) {
			if ( mark.visible == false ) {
				mark.visible = true;
			} else {
				mark.visible = false;
			};
		};
		checkBox.on("pointertap",onCheckBox);
		Handler.showImgRect(self.mainGroup,"lableTellFrDailyBonus.png",210,218,196,17);
		self.mainGroup.interactive = true;
		return self.mainGroup;
	};
	
	CWindDailyBonus.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindDailyBonus;