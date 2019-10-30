	
	"use strict";
	
	let CWindBeforeLevel = {};
	
	CWindBeforeLevel.newObject = function(){
		this.winds = {};
		return this;
	};
	
	CWindBeforeLevel.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		self.mainGroup.sortableChildren = true;
		self.windGroup = Handler.newGroup(self.mainGroup);
		Handler.showImgRect(self.windGroup,"backgrWindM.png",0,0,594,624);
		let cross = Handler.showImgRect(self.windGroup,"cross.png",275,-270,36,36);
		cross.interactive = true;
		cross.buttonMode = true;
		cross.on("pointerdown", function() { self.shutdown() });
		Handler.showImgRect(self.windGroup,"lableLevel.png",-45,-270,171,38);
		
		let levelNumber = params.numLevel == null ? User.ml+1 : params.numLevel;
		Head.levelName = 'l'+Handler.cv( levelNumber );
		let levelImg = Handler.showNumber('w',90,-270,levelNumber,20,28,self.windGroup,'',0);
		levelImg.x -= Math.floor(levelImg.width/2);
		Handler.showImgRect(self.windGroup,"lableBuyBons.png",0,-230,351,31);
		Handler.showImgRect(self.windGroup,"lableBuyBons.png",0,-230,351,31);
		Handler.showImgRect(self.windGroup,"backgrBons.png",0,-180,494,72);
		Handler.showImgRect(self.windGroup,"lableTasks.png",0,-130,105,25);
		Handler.showImgRect(self.windGroup,"backgrTasks.png",0,-7,551,216);
		
		let pointerDownButPlay = function ( evt ) {
			let but = evt.target;
			but.y += 7;
			setTimeout(  function() { but.y -=  7;  },  500 );
		};
		/*let pointerUpButPlay = function ( evt ) {
			self.shutdown();
			Head.levelName = '0'+levelNumber;
			Handler.levelNum = levelNumber;
			
			Winds.show( Winds.WIND_GAME );
		};*/
		let askLevelGet = function() {
			var fparams = {};
			fparams['l'] 		= Head.levelName;
			fparams['energy_v'] = Head.energy;
			fparams['coins'] 	= Head.coins;
			BackClient.ask(	BackClient.LEVEL_GET, Handler.onStartLevel,fparams);
			self.shutdown(1);
		};
		
		let truePlay = User.energy > 0;
		if ( truePlay == false ) {
			Handler.showImgRect(self.windGroup,"backgrButContinue.png",0,195,468,200);
			let butContinue = Handler.showImgRect(self.windGroup,"butContinue.png",2,208,401,76);
		} else {
			Handler.showImgRect(self.windGroup,"backgrButPlay.png",0,193,242,68);
			let butPlay = Handler.showImgRect(self.windGroup,"butPlay.png",0,185,242,65);
			butPlay.name = 'l'+Handler.cv(levelNumber);
			butPlay.onEL('pointerdown', pointerDownButPlay);
			//butPlay.onEL('pointerup', pointerUpButPlay);
			butPlay.onEL('pointerup', askLevelGet);
		};
		
		if ( Handler.butBonuses )
            for( const b of Handler.butBonuses )
                b.destroy();

        Handler.butBonuses = [];
        for ( let i = 0; i < 6; i++ ) {
			if ( i > 1 && i < 5 ) {
				let bname = Consts.BONUSES_NAMES[i-2];
				Handler.butBonuses[i-2] = new ButBonus(self.windGroup, -208 + i*83, -178, bname, 1 );
			} else {
				Handler.showImgRect(self.windGroup,"disbon"+i+".png",-208+i*83,-180,63,69);
			};
		};
		
		/*let kBons = [null,null,0,30,0,null];
		let xBonStart = -211;
		for ( let i = 1; i <= 6; i++ ) {
			if ( i >= 3 && i < 6 ) {
				let bon = Handler.showImgRect(self.windGroup,"bon"+i+".png",xBonStart,-180,wBon[i-1],hBon[i-1]);
				if ( kBons[i-1] == 0 ) {
					Handler.showImgRect(self.windGroup,"plusBon.png",bon.x+15,bon.y+20,21,21);
				} else {
						let textParams = {
							fontFamily: 'Arial',
							fontSize: 22,
							fontWeight: 'bold',
							fill: '#FF6600',
							stroke: '#FFFFFF',
							lineJoin: 'round',
							strokeThickness: 3,
						};
						Handler.showText(self.windGroup,"x"+kBons[i-1],bon.x+15, bon.y+20, textParams);
				}
			} else {
				Handler.showImgRect(self.windGroup,"disbon"+i+".png",xBonStart,-180,wBon[i-1],hBon[i-1]);
			}
			xBonStart = xBonStart;
		}*/
		TaskBeforeLevel.show( self.windGroup, levelNumber );
	
		self.windGroup.x = self.windGroup.x + 85;
		self.windGroup.y = self.windGroup.y - 15;
		//------------------------//
		//-------WindRating-------//
		//------------------------//
		self.windRating = CWindSmallRating.showWindRating();
		self.mainGroup.addChild(self.windRating);
		self.windRating.zIndex = 0;
		self.windGroup.zIndex = 1;
		TweenMax.to( self.windRating, 2, { x:-250 } );
		//
		self.mainGroup.interactive = true;
		return self.mainGroup;
	}
	
	CWindBeforeLevel.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindBeforeLevel;