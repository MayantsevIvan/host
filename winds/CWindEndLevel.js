	
	"use strict";
	
	let CWindEndLevel = {};
	
	CWindEndLevel.newObject = function() {
        this.winds = {};
        return this;
    };
	
	CWindEndLevel.showPoints = function() {
		this.minCP += 1;
		if ( this.imgP ) this.imgP.destroy();
		this.imgP = Handler.showText(this.mWind, this.minCP, 0, 60, this.textParams);
		if ( this.minCP == this.points ) clearInterval( this.timerPoints );
	};
	
	CWindEndLevel.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
	
		self.mainGroup.sortableChildren = true;
		self.mWind = Handler.newGroup(self.mainGroup);
		Handler.showImgRect(self.mWind,"backgrEndLevelWindM.png",0,0,427,584);
		let cross = Handler.showImgRect(self.mWind,"cross.png",195,-270,36,36);
		cross.onEL("pointerdown", function(evt) { clearInterval( this.timerPoints ); self.shutdown(); });
		Handler.showImgRect(self.mWind,"lableLevel.png",-60,-260,171,38);
		
		let levelNumber = parseInt(Head.levelName.substr(1));;
		let levelImg = Handler.showNumber('w',95,-260,levelNumber,20,28,self.mWind,'',0);
		levelImg.x -= Math.floor(levelImg.width/2);
		let starArray = [];
		let starKor_X = [ -160, -95,-155,-140,-30,-160,160,115,150,170,115 ];
		let starKor_Y = [ -200,-118,  40, 150,150, 240,215,135, 75, 30,-212 ];

		for ( let i = 0; i <= starKor_X.length; i++ ) {
			starArray[i] = Handler.showImgRect(self.mWind,"star.png",starKor_X[i],starKor_Y[i],40,38);
			TweenMax.to( starArray[i], Consts.TIME_ROT_START/1000, { angle: 90, ease: Power0.easeNone, repeat: -1, yoyo: true} );
		}
		
		let luch1 = Handler.showImgRect(self.mWind,"luch.png",0,-45,379,370);
		let luch2 = Handler.showImgRect(self.mWind,"luch.png",0,-45,379,370);
		luch1.alpha = 0.35;
		luch2.alpha = 0.35;
		TweenMax.to( luch1, 10, { angle:  360, ease: Power0.easeNone, repeat: -1 } );
		TweenMax.to( luch2, 10, { angle: -360, ease: Power0.easeNone, repeat: -1 } );
		
		Handler.showImgRect(self.mWind,"lableWinEndLevel.png",0,-175,348,90);
		
		let countStar = params.stars;
		let xStartStar = -133;
		let showStar = true;
		
		for( let i = 1; i <= 3; i++ ) { 	
			let numStar = i;
			if ( i == 3 ) { numStar = 1; };
			let backgrStar = Handler.showImg(self.mWind,"backgrStarRt"+numStar+".png",xStartStar,-45);
			backgrStar.width = backgrStar.width/2;
			backgrStar.height = backgrStar.height/2;
			if ( i <= countStar ) {
				let starRt = Handler.showImg(self.mWind,'starRt'+numStar+'.png',xStartStar,-45);
				starRt.width  = starRt.width/2;
				starRt.height = starRt.height/2;
			}
			xStartStar = xStartStar + 130;
		}
		
		Handler.showImgRect(self.mWind,"fieldPoint.png",-15,60,157,46);
		Handler.showImgRect(self.mWind,"fieldIgnots.png",-15,110,158,34);
		
		this.points = params.points;
		this.minCP = 0;
		
			
		
		this.ingnots = params.coins;
		
		this.textParams = {
			fontFamily: 'Arial',
			fontSize: 26,
			fontWeight: 'bold',
			fill: '#B04001',
			stroke: '#F3EFB8',
			lineJoin: 'round',
			strokeThickness: 3,
		};
		this.timerPoints = setInterval( function(){ self.showPoints() }, 10 );
		
		let imgI = Handler.showText(self.mWind,this.ingnots, 0, 110, this.textParams);
		//imgI.x = Math.floor( imgI.x - imgI.width/2 );
		Handler.showImgRect(self.mWind,"lablePointsEndLevel.png",120,60,83,18);
		Handler.showImgRect(self.mWind,"lableIgnots.png",130,110,107,18);
		
		Handler.showImgRect(self.mWind,"backgrButContinueEndLevel.png",0,210,243,70);
		
		
		let pointerDownButContinue = function( evt ) {
			//TweenMax.to(evt.target,  0.2, { y: evt.target.y+ 4 });
			let but = evt.target;
			but.y +=  5;
			setTimeout(  function() { but.y -=  4;  },  500 );
			console.log(evt.target.name);
		};
		
		let pointerUpButContinue = function( evt ) {
			self.shutdown();
			
			let nextLevelNum = parseInt( Head.levelName.substr(1) ) + 1;
			let nlev = 'l'+Handler.cv( nextLevelNum );
			Handler.onStartLevelClick( { target: { name: nlev } } );
		};
		
		let butContinue = Handler.showImgRect(self.mWind,"butContinueEndLevel.png",-3,205,242,66);
		butContinue.onEL( 'pointerdown', pointerDownButContinue );
		butContinue.onEL( 'pointerup',   pointerUpButContinue );
		
		self.pWind = Handler.newGroup();
		self.mainGroup.addChild(self.pWind);
		
		let checkBox = Handler.showImgRect(self.mWind,"checkBox.png",-38,260,19,19);
		checkBox.interactive = true;
		checkBox.buttonMode = true;
		let onCheckBox = function() { 
			if ( marker.visible ){
				marker.visible = false;
			}else{
				marker.visible = true;
			}
		}
		checkBox.on('pointerdown', onCheckBox );
		let marker = Handler.showImgRect(self.mWind,"marker.png",-35,255,30,24);
		Handler.showImgRect(self.mWind,"lableTellFr.png",75,262,195,16);
		
		Handler.showImgRect(self.pWind,"backgrEndLevelWindP.png",0,0,383,447);
		Handler.showImgRect(self.pWind,"lableGetPrize.png",108,155,163,98);
		
		let butShowPuzzle = Handler.showImgRect(self.pWind,"butShowPuzzle.png",108,60,140,59);

		Handler.showImgRect(self.pWind,"backgrPuzzleElem.png",108,-27,102,102);
		Handler.showImgRect(self.pWind,"lablePuzzleNewElem.png",108,-147,136,125);
		self.pWind.zIndex = 0;
		self.pWind.x = 182;
		//------------------------//
		//-------WindReting-------//
		//------------------------//
		self.windReting = CWindSmallRating.showWindRating();
		self.mainGroup.addChild(self.windReting);
		self.windReting.zIndex = 0;
		self.mWind.zIndex = 1;
		TweenMax.to( self.windReting, 2, { x:-250 } );
		
		return self.mainGroup;
	}
	
	CWindEndLevel.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindEndLevel;