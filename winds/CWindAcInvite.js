	
	"use strict";
	
	let CWindAcInvite = {};
	
	CWindAcInvite.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAcInvite.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		Handler.showImgRect(self.mainGroup, "backgrAcInvite.png",0,0,662,521);
		let cross = Handler.showImgRect(self.mainGroup, "cross.png",310,-236,36,36);
		
		let onCross = function(evt){
			self.shutdown();
		};
		cross.onEL("pointertap",onCross);
		
		Handler.showImgRect(self.mainGroup, "lableInviteFrAcInvite.png",0,-200,524,53);
		Handler.showImgRect(self.mainGroup, "backgrAcLable.png",0,40,602,386);
		Handler.showImgRect(self.mainGroup, "lableGameAllAcInvite.png",-98,-127,334,29);
		Handler.showImgRect(self.mainGroup, "bonAcInvite.png",-30,-20,270,97);
		Handler.showImgRect(self.mainGroup, "lableBonAcInvite.png",0,90,554,66);
		Handler.showImgRect(self.mainGroup, "backgrButAcInvite.png",0,180,291,60);
		
		let pointerDownButInv = function( evt ) {
			let but = evt.target;
			but.y += 4;
			setTimeout(  function() { but.y -=  4;  },  500 );
		};
		let pointerUpButInv = function( evt ) {
			SocialClient.invite(); 
			self.shutdown();
		};
		
		let butInvite = Handler.showImgRect(self.mainGroup, "butInviteAcInvite.png",0,173,283,62);

		butInvite.onEL( 'pointerdown',pointerDownButInv);
		butInvite.onEL( 'pointerup',pointerUpButInv);
		self.mainGroup.interactive = true;
		return self.mainGroup;
	};
	
	CWindAcInvite.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAcInvite;