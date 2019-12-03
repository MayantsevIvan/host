	
	"use strict";
	
	let CWindBeforeLevel = {};
	
	CWindBeforeLevel.newObject = function(){
		this.winds = {};
		return this;
	};
	
	CWindBeforeLevel.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup( Handler.gWinds );
		//self.shXMainGrIsMobile = isMobile ? 72 : 0;
		self.mainGroup.x = Handler.contentCenterX //- self.shXMainGrIsMobile;
		self.mainGroup.y = Handler.contentCenterY;
		self.mainGroup.sortableChildren = true;
		self.windGroup = Handler.newGroup(self.mainGroup);
		
		let backgrWindM = Handler.showImgRect(self.windGroup,"backgrWindM.png",0,0,594,624);
		//let sc = visibleWidth0/backgrWindM.width;
		//if ( isMobile ) backgrWindM.scale.set( visibleWidth0/backgrWindM.width );
		//console.log('sc',sc);
		console.log('visibleWidth0',visibleWidth0);
		console.log('visibleWidth',visibleWidth);
		let xCross =  275;
		let yCross = -270;
		let shCross = visibleWidth/2 + 8;
		/*if ( isMobile && shCross < xCross ) {
			xCross =  shCross;
		}*/
		let cross = Handler.showImgRect(self.windGroup,"cross.png",xCross,yCross,36,36);
		let touchCross = function(evt) {
			self.shutdown();
		}
		cross.onEL("pointerdown", touchCross );
		
		let yLableLevel = -270;
		Handler.showImgRect(self.windGroup,"lableLevel.png",-45,yLableLevel,171,38);
		
		let levelNumber = params.numLevel == null ? User.ml+1 : params.numLevel;
		Head.levelName = 'l'+Handler.cv( levelNumber );
		let levelImg = Handler.showNumber('w',110, yLableLevel,levelNumber,20,28,self.windGroup,'',0);
		levelImg.x -= Math.floor(levelImg.width/2);
		
		let yLableBuyBonus = -230;
		Handler.showImgRect(self.windGroup,"lableBuyBons.png",0,yLableBuyBonus,351,31);
		let yBackgrBons = -180;
		let backgrBon = Handler.showImgRect(self.windGroup,"backgrBons.png",0,yBackgrBons,494,72);
		backgrBon.scale.set(1.1);
		let yLableTasks = isMobile ? -125 : -130;
		let lableTasks = Handler.showImgRect(self.windGroup,"lableTasks.png",0,yLableTasks,105,25);
		if ( isMobile ) lableTasks.scale.set(1.18);
		let yBackgrTasks = isMobile ? -5 : -7;
		let backgrTasks = Handler.showImgRect(self.windGroup,"backgrTasks.png",0,yBackgrTasks,551,216);
		if ( isMobile ) backgrTasks.scale.set(0.98);
		
		let pointerDownButPlay = function ( evt ) {
			let but = evt.target;
			but.y += 7;
			setTimeout(  function() { but.y -=  7;  },  500 );
		};
	
		let askLevelGet = function() {
			var fparams = {};
			fparams['l'] 		= Head.levelName;
			fparams['energy_v'] = Head.energy;
			fparams['coins'] 	= Head.coins;
			BackClient.ask(	BackClient.LEVEL_GET, Handler.onStartLevel,fparams);
			self.shutdown(1);
		};
		let butPlay = null;
		let backgrButPlay = null;
		let truePlay = User.energy > 0;
		if ( truePlay == false ) {
			let backgrButContinue = Handler.showImgRect(self.windGroup,"backgrButContinue.png",0,195,468,200);
			backgrButContinue.scale.set(0.96);
			let butContinue = Handler.showImgRect(self.windGroup,"butContinue.png",2,208,401,76);
		} else {
			backgrButPlay = Handler.showImgRect(self.windGroup,"backgrButPlay.png",0,193,242,68);
			butPlay = Handler.showImgRect(self.windGroup,"butPlay.png",0,185,242,65);
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
				Handler.butBonuses[i-2] = new ButBonus(self.windGroup, -208 + i*83, yBackgrBons + 2, bname, 1 );
				if ( isMobile ) Handler.butBonuses[i-2].scale = 1.1;
			} else {
				Handler.showImgRect(self.windGroup,"disbon"+i+".png",-208+i*83,yBackgrBons,63,69);
			};
		};
		
		if ( isMobile ) {
			Handler.mobileTask = [];
			let mobileTaskIndex = [];
			for (  let i = 1; i <= 5; i++ ) {
				if ( GameTypes.info[levelNumber]['g'+i] != null ) {
					Handler.mobileTask[i] = GameTypes.info[levelNumber]['g'+i];
					mobileTaskIndex.push(i);
				}
			}
			
			let rndInxDelGem = Math.floor(Math.random() * mobileTaskIndex.length);
			let rndDelGem = mobileTaskIndex[rndInxDelGem];
			let countDistributedGems = GameTypes.info[levelNumber]['g'+rndDelGem];
			Handler.mobileTask[rndDelGem] = 0;
			mobileTaskIndex.splice(rndInxDelGem,1);

			for( let i = 0; i <countDistributedGems; i++ ) {
				let num = i % mobileTaskIndex.length;
				//console.log("mobileTaskIndex",mobileTaskIndex[num]);
				Handler.mobileTask[mobileTaskIndex[num]] += 1;
			};
		};

		TaskBeforeLevel.show( self.windGroup, levelNumber );
	
		self.windGroup.x += 85;
		self.windGroup.y -= 15;
		self.windGroup.toFront();
		if ( isMobile ) {
			self.windGroup.y += 42;
			self.windGroup.x -= 82;
			self.windGroup.scale.set(visibleWidth/self.windGroup.width);
			console.log('self.windGroup.x',self.windGroup.x);
		}
		//------------------------//
		//-------WindRating-------//
		//------------------------//
		let showRating = function( evt ) {
			if ( !Handler.visibleRt ) {
				self.windRating = CWindSmallRating.showWindRating();
				self.windRating.x = self.windRating.width/2 + visibleWidth/2;
				self.windRating.y += 34;
				let shRtX = self.windRating.x - 200;
				Handler.toFront( self.windRating );
				self.mainGroup.addChild(self.windRating);
				TweenMax.to( self.windRating, 0.8, { x: shRtX } );
			};
		};
		
		if ( isMobile ) {
			if ( truePlay ) {
				butPlay.y = 165; 
				backgrButPlay.y = 173;
				let butShowRating = Handler.showImgRect(self.windGroup,"butPlay.png",0,250,242,65);
				butShowRating.onEL("pointertap",showRating);
			}
		} else {
			self.windRating = CWindSmallRating.showWindRating();
			self.mainGroup.addChild(self.windRating);
			TweenMax.to( self.windRating, 2, { x:-250 } );
		};
		
		return self.mainGroup;
	}
	
	CWindBeforeLevel.shutdown = function( fastShutdown ){
		let self = this;
		if ( Winds.shutdown( self.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage( self.mainGroup );
				self.mainGroup.removeSelf();
			} else {
				Handler.removeWindAfterTransition( self.mainGroup );
			};
  		};
	};

	//return CWindBeforeLevel;