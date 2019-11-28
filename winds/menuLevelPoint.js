	//let menuLevelPoint = {};
	//menuLevelPoint.__index = menuLevelPoint;
	"use strict";
	
	let menuLevelPoint = function( parentGroup, x, y, xSmallPoint, ySmallPoint, numLevel, opened, stars, arrow ) {
		let self = this;
		self.group = Handler.newGroup( parentGroup );
		self.xLevel = x;
		self.yLevel = y;
		self.group.name = 'l'+Handler.cv( numLevel );
		self.xSmallPoint = xSmallPoint;
		self.ySmallPoint = ySmallPoint;
		self.numLevel = numLevel;
		self.group.numLevel = numLevel;
		self.opened = opened;
		self.countStar = stars == null ? 0 : stars.s;
		self.arrow = arrow;
		
		return self;	
	};
   
	menuLevelPoint.prototype.Show = function() {
		let self = this;
	
		if ( !self.opened ) {
			Handler.showImgRect( self.group, "disBackgrBoxLevel.png",0,0,45,42 );
			Handler.showImgRect( self.group, "castle.png",0,-10,22,25 );
			Handler.showImgRect( self.group, 'pointNextLevelClose.png', self.xSmallPoint, self.ySmallPoint, 12,10);
			if ( self.arrow ) {
				let imgArrow = Handler.showImgRect( self.group,"arrowLastYourLevel.png",0,-55,45,42 );
				TweenMax.to( imgArrow, 0.7, { y: -40, ease: Power0.easeNone, repeat: -1, yoyo: true });
			}
		} else {
			Handler.showImgRect( self.group, "enBackgrBoxLevel.png", 0,0, 45,42);
			Handler.showImgRect( self.group, 'pointNextLevel.png', self.xSmallPoint, self.ySmallPoint, 12,10);
			if ( self.arrow ) {
				let imgArrow = Handler.showImgRect( self.group,"arrowLastYourLevel.png",0,-55,45,42 );
				TweenMax.to( imgArrow, 0.7, { y: -40, ease: Power0.easeNone, repeat: -1, yoyo: true });
			} else { 
				Handler.showImgRect(self.group,"cup.png",0,-12,31,28);
				let xStar = -15;
				for ( let i = 1; i <= 3; i++ ) {
					if( self.countStar != null && self.countStar >= i ) {
						Handler.showImgRect( self.group,"winStarLevel.png", xStar,-33,13,13 );
					} else {
						Handler.showImgRect( self.group,"backgrStarLevel.png", xStar,-33,13,13 );
					};
					xStar = xStar + 15;
				};
			};
			//self.group.onEL('pointerup', function() { self.touchLevel() });
			self.group.onEL('pointertap',  Handler.onStartLevelClick );
		}
		
		let numLevelImg = Handler.showNumber( "swb", 4, 10, self.numLevel, 9, 13, self.group, '', 1 );
		numLevelImg.x -= Math.floor( numLevelImg.width/2 );
		self.group.x = self.xLevel;
		self.group.y = self.yLevel;
		
		return self;
	};
	//return menuLevelPoint;