
	"use strict";

	let CWindMsg = {};
	CWindMsg.__index = CWindMsg;
	
	CWindMsg.newObject = function(){
		let self = this;
		self.winds = {};

		return self;
	};
	
	CWindMsg.startup = function( params ){
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;

		Handler.showImgRect(self.mainGroup, "backgrWindMessage.png",0,0,612,495);
		Handler.showImgRect(self.mainGroup, "couldWindMessage.png",0,-40,527,347);
		
		let onCross = function(evt){
			self.shutdown();
		};
		
		let cross = Handler.showImgRect( self.mainGroup, "cross.png", 285, -225, 36, 36);
		cross.onEL("pointertap", onCross);
		let butClose = Handler.showImgRect( self.mainGroup, 'buttonClose.png', 0, 185, 157, 48);
		butClose.onEL("pointertap", onCross);
		
//		let colorText = [255,234,198];
//		let colorShadow = [ 118,54, 7 ];
		
		if  ( params.text != null ) {
			//let paramsText = {
			//	align: 'center',
			//	fontFamily: 'Arial',
			//	fontSize:  30,
			//	fontWeight: 'bold',
			//	fill: '#FFFFFF',
			//	stroke: '#993300',
			//	strokeThickness: 4,
			//	width: 450
			//};
			let paramsText = {
				text: params.text,
				align: 'center',
				fontFamily: 'Arial',
				fontSize:  30,
				fontWeight: 'bold',
				fill: '#FFFFFF',
				stroke: '#993300',
				strokeThickness: 4,
				wordWrapWidth: 1000,
				wordWrap: true,
				y: -80,
				parent: self.mainGroup
			};
			//Handler.showText(self.mainGroup,  params.text, 0, -80 , paramsText);
			let text = Handler.newText( paramsText );
			text.anchor.set(0.5,0.5);
		}
		return self.mainGroup;
	};
	
	CWindMsg.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};
