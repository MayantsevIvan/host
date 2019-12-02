	
	"use strict";
	
	let CWindMenuLevels = {};
	//CWindMenuLevels.__index = CWindMenuLevels;
	
	CWindMenuLevels.newObject = function(){
		this.winds = {};
		this.imgBackgr = null;
		return this;
	};
	
	CWindMenuLevels.showLocation = function() {
		let self = this;
		
		this.showBakcgr();
			
		/*if ( !self.imgBackgr ) {
			self.loadingGr = Handler.newGroup( self.mainGroup );
			self.backgrLoading = Handler.showRect( self.loadingGr, 0, 0, Handler.contentWidth, Handler.contentHeight, '0x6E3232' );
		    self.backgrLoading.alpha = 0.3;
			self.backgrLoading.interactive = true;
			Handler.showImgRect( self.loadingGr, 'backgroundLoading.png', 0,0,402,202 );
		};*/
		//self.background = background;
		//self.background.isVisile = false;
		if ( self.manyLevesGroup ) self.manyLevesGroup.destroy();
		self.manyLevesGroup = Handler.newGroup( self.mainGroup );
		self.maxLevel = ( self.numLocation * self.maxCoutnLevel ) - 1; //arrays 0-49 before lua 1 - 50;
		self.minNumLevel = self.maxLevel - (self.maxCoutnLevel - 1);

		let levelPointData = { 
		            //num   1   2    3     4   5   6  7    8   9  10  11  12  13  14  15  16   17   18  19    20   21   22   23   24  25 26  27  28  29  30  31  32  33  34  35  36  37   38    39   40   41  42   43   44   45    46  47    48   49  50     
			x         : [-343,-276,-200,-124,-49, 26,102,178,255,339,328,255,177,105, 28,-46,-122,-198,-274,-340,-344,-274,-202,-125,-46,26,102,178,255,330,326,260,180,104, 28,-46,-124,-198,-268,-330,-332,-250,-188,-126, -50,  26, 102, 178, 234,312 ],
			y         : [ 258, 258, 254, 255,256,256,256,260,250,252,145,165,155,148,155,165, 135, 136, 156, 100,  38,  26,  36,  40, 74,78, 42, 34, 39, 54,-36,-58,-60,-92,-94,-94, -74, -56, -38, -42,-106,-118,-158,-145,-156,-158,-186,-182,-148,-98 ],
			opened    : []		
		};
		for ( let i = self.minNumLevel; i <= self.maxLevel; i++ ) {
			if( i <= self.currentLevel ) {
				levelPointData.opened[i] = true;
			} else {
				levelPointData.opened[i] = false;
			}
		}
		let k = 49;
		let mlPoints = [];
		//относительно объекта menuLevelPoint
		let xSmallPoint = [ 33, 38, 38, 38, 38, 38, 38, 38, 42,  -5, -38, -38, -35, -38, -36, -40, -38, -38, -40,  -2, 34, 37, 39,  42, 38,  40, 38, 38, 38,  -2, -32, -38, -40, -38, -38, -38, -38, -35, -32,  -3, 38,  35, 32, 38, 38,  35, 38, 30, 38, 38 ];
		let ySmallPoint = [ -5, -5, -5, -5, -5, -5, -3, -8, -5, -60,   0,  -8,  -7,   2,   3,  -15, -3,   8, -25, -32, -8,  0, -2,  10,  0, -19, -8,  0,  4, -45, -15,  -5, -13,  -5,  -5,   5,   5,   5,  -5, -32, -8, -16,  2, -8, -6, -16,  0, 10, 26, -5 ];
		//if ( isMobile ) {
		//	for( let i = 0; i < levelPointData.x.length; i++ ) {
		//		if ( [42,31,33,35,44,45,46,47,48].indexOf(i) < 0 ) {
		//		    levelPointData.y[i] -= i<10 ? 60 : 45;
		//		}
		//	}
        //    levelPointData.y[42] -= 5; levelPointData.x[42] += 5; ySmallPoint[42] -= 5; 
        //    levelPointData.y[35] -= 33;
        //    levelPointData.y[33] -= 30;
        //    levelPointData.y[31] -= 30;
        //    levelPointData.y[44] -= 30;
        //    levelPointData.y[45] -= 43; ySmallPoint[45] += 17; xSmallPoint[45] += 5;
		//	levelPointData.y[46] += 3;
		//	levelPointData.y[47] += 7; levelPointData.x[47] -= 7; 
		//	levelPointData.y[48] -= 5; levelPointData.x[48] += 3; ySmallPoint[48] -= 10;
		//	
		//}

		for ( let i = self.maxLevel; i >= self.minNumLevel; --i ) {	
			let withArrow = self.currentLevel == i;
			
			mlPoints[i] = new menuLevelPoint( 	self.manyLevesGroup, 
												levelPointData.x[k], 
												levelPointData.y[k],
												xSmallPoint[k],
												ySmallPoint[k],
												i+1, 
												levelPointData.opened[i], 
												User.stars[i+1], 
												withArrow	);	
			mlPoints[i].Show();
			
			k -= 1;
		}
	//	Handler.toFront(self.loadingGr);
		//Handler.toBack( self.background );
	}
	
	CWindMenuLevels.showBakcgr = function( ) {
		let self = this;
		this.numBackgr = (self.numLocation-1)%32+1;
	//	let yBackgr = isMobile ? -38 : 0;
		let nameBackgr = Consts.DIR_BACKGROUNDS + 'mBackgr'+this.numBackgr+'.png';
		let backToBack = function( img ){
			console.log('endLoadBackgr');
			self.backgr[self.numBackgr] = 1;
			self.imgBackgr = img;
			Handler.toBack(img);
			//if ( self.loadingGr ) self.loadingGr.removeSelf();
			//let bakcgrScaleMobile = pixiApp.screen.height / img.height / pixiAppScaleMobile;
			//let bakcgrScaleMobile = visibleHeight / img.height;
			
			//img.scale.x = bakcgrScaleMobile;
			//img.scale.y = bakcgrScaleMobile;
			/*const graphics1 = new PIXI.Graphics();
            graphics1.beginFill(0x0000AA);
            graphics1.drawRect(0, 0, 760, 610);
            graphics1.endFill();*/
            
			
			/*self.mainGroup.addChild( graphics1 );
			graphics1.scale.x = bakcgrScaleMobile;
			graphics1.scale.y = bakcgrScaleMobile;
			graphics1.x -= graphics1.width/2;
			graphics1.y -= graphics1.height/2;*/
;		
		};

		if ( self.backgr[this.numBackgr] != 0 ) {
			self.imgBackgr = Handler.showImgRect( self.mainGroup,  nameBackgr, 0, 0, 760, 610 );
			Handler.toBack(self.imgBackgr);
			//let bakcgrScaleMobile = pixiApp.screen.height / self.imgBackgr.width;
			//self.imgBackgr.scale.x = bakcgrScaleMobile;
			//self.imgBackgr.scale.y = bakcgrScaleMobile;
 		} else {
			//console.log('start load', Consts.DIR_BACKGROUNDS + 'mBackgr'+this.numBackgr+'.png');
			Handler.loadAndDrawRemoteImage( self.mainGroup, null, nameBackgr, 0, 0, 760, 610, backToBack );
			//Handler.showImgRectAfterLoaded( self.mainGroup,  nameBackgr, 0, 0, 760, 610, backToBack )
		};
	}
	
	CWindMenuLevels.initStats = function(){
		let self = this;
		self.currentLevel = User.ml;
		self.maxCoutnLevel = 50;
		self.numLocation = Math.floor( (User.ml - 1) / 50 ) + 1;
		self.maxLevel = ( self.numLocation * self.maxCoutnLevel ) - 1; //arrays 0-49 before lua 1 - 50;
		self.minNumLevel = self.maxLevel - (self.maxCoutnLevel - 1);
	};
	
	CWindMenuLevels.startup = function( params ) {
		let self = this;
		Sounds.Play();
		self.mainGroup = Handler.newGroup( Handler.canvas );
		self.mainGroup.sortableChildren = true;
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		//self.numLocation = 1;
		this.initStats();
		this.backgr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];	
		this.showLocation();
		
		
		/*this.	 = [];
		this.arBackgr = [];
		
		
		for( let i = 1; i <= 32; i++){
			this.arBackgrName.push( 'mBackgr'+i+'.png' );
		}*/

		if ( !isMobile )self.bottomPanel = BottomPanel.show();
//		self.mainGroup.addChild(self.bottomPanel);
		//self.manyLevesGroup = null;
		
		 //  array 0; 

		//self.showLocation();
		
		let onArrowRight = function( evt ) {
			if ( self.imgBackgr ) Handler.removeImage( self.imgBackgr );
			if( self.numLocation < 1 ) {
				self.numLocation = 1;
			}
			self.numLocation = self.numLocation + 1;
			//self.showBakcgr();
			self.manyLevesGroup.destroy();
			self.showLocation();
		}
		
		let onArrowLeft = function( evt ) {
			self.numLocation = self.numLocation - 1;
			if( self.numLocation > 0 ) {
				if ( self.imgBackgr ) Handler.removeImage( self.imgBackgr );
				//self.showBakcgr();
				self.manyLevesGroup.destroy();
				self.showLocation();
			}
		}
		
		let yAr = isMobile ? -80 : -35;
		let xArLeft = isMobile ? 50 : -370;
		let arrowLeft = Handler.showImgRect(self.mainGroup, "arrowLeft.png",xArLeft,yAr,16,52);
		arrowLeft.interactive = true;
		arrowLeft.buttonMode = true;
		arrowLeft.on("pointerdown", onArrowLeft);
		let arrowRight = Handler.showImgRect(self.mainGroup, "arrowRight.png",370,yAr,16,52);
		arrowRight.interactive = true;
		arrowRight.buttonMode = true;
		arrowRight.on("pointerdown", onArrowRight);
		
		let touchMenuLevel = function ( evt ) {
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			self.pointTouchStart = gx;
		};
		
		self.scaleScreen = visibleHeight / pixiAppHeight;
		//let maxRight = Math.floor(( Handler.contentCenterX + visibleWidth/2));//сдвиг поля
		let maxRight = Math.floor(( Handler.contentCenterX + (self.mainGroup.width/2 - visibleWidth/2) ) );//сдвиг поля
		let maxLeft  = Math.floor(( Handler.contentCenterX - (self.mainGroup.width/2 - visibleWidth/2) ) );
		
		console.log("Handler.contentCenterX",Handler.contentCenterX);
		console.log("visibleWidth",visibleWidth/2);
		console.log("maxRight", maxRight);
		console.log("maxLeft",  maxLeft);
		console.log("self.scaleScreen",  self.scaleScreen);
		let moveMenuLevel = function ( evt ) {
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			
			if ( self.pointTouchStart ) {
				let shMenuLevel = 0;
				if ( self.mainGroup.x + gx - self.pointTouchStart <=  maxRight &&  self.mainGroup.x + gx - self.pointTouchStart >=  maxLeft ) {
					self.mainGroup.x += gx - self.pointTouchStart;
				};
				self.pointTouchStart = gx;
			};
			console.log("self.mainGroup.x",self.mainGroup.x);
		};
		
		if (isMobile) { 
			//self.mainGroup.scale.x = self.scaleScreen;
			//self.mainGroup.scale.y = self.scaleScreen;
			self.mainGroup.onEL('pointermove',moveMenuLevel);
			self.mainGroup.onEL('pointerdown',touchMenuLevel);
		}; 
	}
	
	CWindMenuLevels.newObject = function(){
		this.winds = {};
		return this;
	}
	
	CWindMenuLevels.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindMenuLevels;