	
	"use strict";
	
	let CWindBuyCoins = {};
	//CWindBuyCoins.__index = CWindBuyCoins;
	
	CWindBuyCoins.newObject = function(){
		this.winds = {};
		return this;
	};
	
	CWindBuyCoins.startup = function( params ) {
		let self = this;
		
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+"backgrBuyCoins.png",0,0,662,539);
			let cross = Handler.showImgRect(self.mainGroup,"cross.png",310,-224,36,36);
			cross.interactive = true;
			cross.buttonMode = true;
			cross.onEL("pointerdown",function() {self.shutdown()});
			
			let numGroup = Handler.newGroup();
			self.mainGroup.addChild(numGroup);
			
			let countIgnots = Head.coins;
			let countIgnotsImg = Handler.showNumber('wb',27,-242,countIgnots,15,22,self.mainGroup,'',0);
			countIgnotsImg.x -= countIgnotsImg.width/2;
			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+"lableBuyIgnots.png",0,-198,502,29);
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
			};
			
			let pointerUpButBuy = function( evt ) {
				let butNumber = parseInt( evt.target.name.substr(3) );
				if ( butNumber < 1 || butNumber > 6 ) return;
				
				let oks = [ 0, 1000, 500, 250, 100, 50, 20 ];
				SocialClient.callbackPayment = Handler.getCoEnFromServer;
				SocialClient.Payment( butNumber, Langs[ "payName" + butNumber ],  oks[ butNumber ] );
				
				let onBuyEnegyForCoinsAsked = function(res) {
					self.shutdown();
					Head.energy = res['energy_v'];
					Head.coins  = res['coins'];
				}
				BackClient.ask( BackClient.GET_COINS_AND_ENERGY, onBuyEnegyForCoinsAsked, { energy_v: User.energy, coins: User.coins, num: butNumber-4 });
				//self.shutdown();
			};

			let yLine = -187;
			for ( let i = 1; i <= 6; i++ ) {
				let line = Handler.showImg(self.mainGroup,Consts.DIR_BUY_COINS+"line"+i+".png",0,yLine);
				line.anchor.set(0.5,0);
				line.width  /= 2;
				line.height /= 2;
				let yBut = i == 1 ? yLine + line.height/2 : yLine + line.height/2 - 2;

				let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+"butBuy.png",218, yBut,162,48);
				butBuy.name = "but"+i;
				butBuy.onEL("pointerdown", pointerDownButBuy);
				butBuy.onEL("pointerup", pointerUpButBuy);
				yLine += line.height+2;
			}
		}
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_COINS ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_COINS ] = 1;
			let listOfImages = [
				"winds/buyCoins/backgrBuyCoins.png",
				"winds/buyCoins/butBuy.png",
				"winds/buyCoins/lableBuyIgnots.png",
				"winds/buyCoins/line1.png",
				"winds/buyCoins/line2.png",
				"winds/buyCoins/line3.png",
				"winds/buyCoins/line4.png",
				"winds/buyCoins/line5.png",
				"winds/buyCoins/line6.png",
			];
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindBuyCoins.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindBuyCoins;