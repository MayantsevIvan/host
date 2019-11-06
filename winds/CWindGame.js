	
	"use strict";
	
	let CWindGame = {};
	CWindGame._sprite = null;
	CWindGame._panelLamps = null;
	CWindGame._panelScore = null;
	//let _textSteps:CText : null,
	//let _textTimer:CText : null,
	
	//let _airLamp:Sprite = new Embeds.fonar();
	CWindGame._boosterVL = null;
	CWindGame._boosterGL = null;
	CWindGame._boosterPL = null;
	CWindGame._boosterMX = null;
	CWindGame._boosterMT = null;
	CWindGame._boosterCH = null;
	CWindGame._butFinLevel = null;
	CWindGame._butFullScr = null;
	CWindGame._butMelody = null;
		
	CWindGame._txtLevel = null;
	
	CWindGame.newObject = function() {
        this.winds = {};
        return this;
    };
	
	CWindGame.startup = function( params ) {
		params = params || {};
		let self = this;
		self.mainGroup = Handler.newGroup( Handler.gWinds );
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		//Sounds.Play();
//		Head.menuLevel.visible = false;
//		Head.menuLevel.hide();
//
		let backgr = Handler.showImgRect(this.mainGroup, Consts.DIR_WIND_LOADER+"backgrWindGame.png",0,0,760,610);
		let numLevel = parseInt(Head.levelName.substr(1));
		Handler.levelNum = numLevel;
		Handler.showImgRect(self.mainGroup, "panelLevelWindGame.png",-320,-288,103,23);
		let textNumLevelParams = {
			fontFamily: 'Arial',
			fontWeight: 'bold',
			fontSize: 16,
			fill: '#FFFFFF'
		};
		Handler.showText(self.mainGroup,numLevel,-300,-288,  textNumLevelParams);
		let cross = Handler.showImgRect(self.mainGroup, "crossWindGame.png",358,-285,33,28);
		
		let onTouch = function(evt) {
			/*if ( Winds.getTopWindName() == Winds.WIND_SMALL_ACT_INV ) {
	//			Winds.getWind().shutdown(0);
	            Winds.shutdownTopWind(1);
    		};
			if ( Winds.getTopWindName() == Winds.WIND_ACT_5_STEPS ) {
	//			Winds.getWind().shutdown(0);
	            Winds.shutdownTopWind(1);
			};*/
			clearTimeout( Handler.timerOpenAcInv);
			self.shutdown();
		};
		cross.onEL("pointerdown",onTouch);
		
//		let butSkipLevel = Handler.showImgRect(self.mainGroup, "butSkipLevelWindGame.png",-335,240,54,48);
		let butFullScrin = Handler.showImgRect(self.mainGroup, "butFoolScrinWindGame.png",352,-246,31,31);
		if ( isMobile ) butFullScrin.isVisible = false;
		butFullScrin.onEL('pointerdown',function(){ Winds.show( Winds.WIND_FULL_SCREEN ) });
		
		let butMute1 = Handler.showImgRect( self.mainGroup, "butMute.png",353,-213,33,33);
		let butMute2 = Handler.showImgRect( self.mainGroup, "butMute2.png",353,-213,33,33);
		butMute2.isVisible = false;
		let touchButMute = function( evt ) {
			if ( Sounds.msOn ) {
				Sounds.Stop();
//				this._butMelody.gotoAndStop(2);
				Sounds.msOn = false;
				butMute1.isVisible = true;
				butMute2.isVisible = false;
			} else {
				Sounds.Play();
//				this._butMelody.gotoAndStop(1);
				butMute1.isVisible = false;
				butMute2.isVisible = true;
				Sounds.msOn = true;
			};
		};
		butMute1.onEL("pointerdown",touchButMute);
		butMute2.onEL("pointerdown",touchButMute);
		
		// GameField
		
		self._sprite = Handler.newGroup();
		/*params.lev =  [ 9,11,7, 1248 ,0, 
					     [6,8,8,0,0,0,0,6,0],
					     [0,0,0,5,5,5,0,0,0],
					     [0,0,0,9,9,9,0,0,0],
					     [0,0,0,0,0,0,0,0,0],
					     [0,0,0,0,7,7,7,0,0],
					     [0,0,0,0,2,2,2,0,0],
					     [0,0,0,0,2,2,2,0,0],
					     [0,0,0,0,0,0,0,0,0],
					     [0,0,0,0,0,0,0,0,0],
					     [0,0,0,0,0,0,0,0,0],
					     [0,0,0,0,0,0,0,0,0]
					 ];*/
		Handler.windGameSprite = self._sprite;
		Handler.lights = Handler.newGroup();
		Handler.level  = Handler.newGroup();		
		Handler.jlines = new JLines( self.mainGroup );
		Handler.jlines.gemsContainer = Handler.newGroup();
		
		Handler.fmask  = Handler.newGroup();
		Handler.lmask  = Handler.newGroup();
		
		Handler.jlines.stepsPanel  = StepsPanel. init( self.mainGroup, params.lev[2] );
		Handler.jlines.pointsPanel = PointsPanel.init( self.mainGroup, params.lev[3] );
		
		Handler.jlines.init(params.lev);//(1) eto vishe ftorogo
		Handler.jlines.taskPanel = TaskPanel.init( self.mainGroup );
		
		Handler.lights.x = Consts.coordsShiftX;
		Handler.lights.y = Consts.coordsShiftY;
		
		
		
		let cx = Consts.coordsShiftX;
		let cy = Consts.coordsShiftY;
		let cw = Consts.coordsWidth;
		let ch = Consts.coordsHeight;
		
		let w = Handler.jlines.cx;
		let h = Handler.jlines.cy;
		
		let graphLevel = new PIXI.Graphics();
		let grapWhite = new PIXI.Graphics();
		let graphOr = new PIXI.Graphics();
		graphOr.lineStyle(8,0xFEDC8C,0.95);
		graphLevel.lineStyle(1,0x1E3940,1);
		self._sprite.addChild(graphOr);
		self._sprite.addChild(grapWhite);
		self._sprite.addChild(graphLevel);
		
		let fmask = new PIXI.Graphics();
		let lmask = new PIXI.Graphics();
		fmask.beginFill(0xffffff);
		lmask.beginFill(0xffffff);
		Handler.fmask.addChild(fmask);
		Handler.lmask.addChild(lmask);
		
		for ( let i=0;i<w;i++ ) {
			for ( let j=0;j<h;j++ ) {
				if (Handler.jlines.hidedGems[i][j] == 0) {//pustie kletki
					/*if ( (i+j)%2==0 ) {
						Handler.level.graphics.beginFill(0x394F6C,1.0);
					} else {
						Handler.level.graphics.beginFill(0x41597A,1.0);
					};*/
					let rcolor = (i+j) % 2 ? 0x41597A : 0x394F6C;
//					Handler.showImg(Handler.level, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
//					Handler.showImg(Handler.fmask, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
//					Handler.showImg(Handler.lmask, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
					
					graphOr.beginFill(0xFEDC8C);
					graphOr.drawRoundedRect(cx+cw*i-Math.floor(cw*1.1/2),cy+ch*j-Math.floor(ch*1.1/2),cw*1.1,ch*1.1, 5);
					graphOr.endFill();
					
					grapWhite.beginFill(0xFFFFFF);
					grapWhite.drawRect(cx+cw*i-Math.floor(cw*1.1/2),cy+ch*j-Math.floor(ch*1.1/2),cw*1.1,ch*1.1);
					grapWhite.endFill();
					
					graphLevel.beginFill(rcolor);
					graphLevel.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					graphLevel.endFill();
					
					fmask.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					lmask.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					
					
					//Handler.showRect(Handler.fmask,cx+cw*i,cy+ch*j,cw,ch,1,0x1E3940);
					//Handler.showRect(Handler.lmask,cx+cw*i,cy+ch*j,cw,ch,1,0x1E3940);

					//Handler.showRect(Handler.level,cx+cw*i-2,cy+ch*j-2,cw,ch,1,rcolor);
					//Handler.level.graphics.endFill();
				};
			};
		};
		fmask.endFill();
		lmask.endFill();
		
		Handler.lights.mask = lmask;//lightsMask;
		Handler.jlines.gemsContainer.mask = fmask;
			
		self._sprite.addChild( Handler.level );
		self._sprite.addChild( Handler.jlines.gemsContainer );

		self._sprite.addChild(Handler.fmask);
		self._sprite.addChild(Handler.lmask);
		self._sprite.addChild(Handler.lights);
		self.mainGroup.addChild( self._sprite );
		Handler.jlines.gemsContainer.x = Consts.coordsShiftX;
		Handler.jlines.gemsContainer.y = Consts.coordsShiftY;
		
		let shiftXgame = self._sprite.width/2  - 58;
		let shiftYgame = self._sprite.height/2 - 20;
		
//		Handler.gemsContainerGlobalX = self.mainGroup.x + Consts.coordsShiftX;
//		Handler.gemsContainerGlobalY = self.mainGroup.y + Consts.coordsShiftY;
		Handler.gemsContainerGlobalX = self.mainGroup.x - shiftXgame;
		Handler.gemsContainerGlobalY = isMobile ? self.mainGroup.y - shiftYgame - 38 : self.mainGroup.y - shiftYgame;
		
		self._sprite.x -= shiftXgame;
		self._sprite.y -= shiftYgame;

		//Bonuses
		if ( Handler.butBonuses )
            for( const b of Handler.butBonuses )
                b.destroy();

        Handler.butBonuses = [];
        for ( let i = 0; i<3; i++ ) {
			let bname = Consts.BONUSES_NAMES[i];
		    Handler.butBonuses[i] = new ButBonus(self.mainGroup, 342, -172+i*72, bname );
		};
		
		let showSmallAc = function() {
			Handler.acSmallInv = Actions.show( Actions.WIND_SMALL_ACT_INV, self.mainGroup );
			console.log(" self.mainGroup",  self.mainGroup);
		}
		console.log(" self.mainGroup",  self.mainGroup);
		Handler.timerOpenAcInv = setTimeout( showSmallAc, 7000 );
		self.mainGroup.interactive = true;
	};
	
	CWindGame.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindGame;