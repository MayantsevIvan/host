	
	"use strict";
	
	let CWindBuyLives = {};
	//CWindBuyLives.__index = CWindBuyLives;
	
	CWindBuyLives.newObject = function(){
		this.winds = {};
		return this;
	}
	
	CWindBuyLives.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		let showContent = function() {
			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+"backgrBuyLives.png",0,0,662,539);
			let cross = Handler.showImgRect(self.mainGroup,"cross.png",310,-230,36,36);
			cross.interactive = true;
			cross.buttonMode = true;
			cross.onEL("pointerdown",function() {self.shutdown()});
			let countLives = Head.energy;
			let countLivesImg = Handler.showNumber('wb',27,-242,countLives,15,22,self.mainGroup,'',0);
			countLivesImg.x -= countLivesImg.width/2;

			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+"lableBuyLives.png",0,-202,319,35);
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
			};
			let pointerUpButBuy = function( evt ) {
				let butNumber = parseInt( evt.target.name.substr(3) );
				if ( butNumber < 1 ) return;	
				if ( butNumber < 5 ) {
					SocialClient.callbackPayment = Handler.getCoEnFromServer;
					let oks = [ 0, 21, 51, 99, 199 ];
					SocialClient.Payment( butNumber, Langs[ "payName" + (butNumber + 6) ],  oks[ butNumber ] );
				}			
				if ( butNumber < 8 ) {
					let costs = [ 50, 150, 450 ];
					if ( Head.coins < costs[butNumber-5] ) {
						Winds.show( Winds.WIND_BUY_COINS );
					} else {
						let onBuyEnegyForCoinsAsked = function(res) {
							self.shutdown();
							Head.energy = res['energy_v'];
							Head.coins  = res['coins'];
						}
						BackClient.ask( BackClient.COINS_TO_ENERGY, onBuyEnegyForCoinsAsked, { energy_v: User.energy, coins: User.coins, num: butNumber-4 });
					}
				}
			};
			
			let yLine = -195;
			for ( let i = 1; i <= 6; i++ ) {
				let line = Handler.showImg(self.mainGroup,Consts.DIR_BUY_LIVES+"line"+i+"BuyLives.png",0,yLine);
				line.anchor.set(0.5,0);
				line.width  /= 2;
				line.height /= 2;
				let yBut = i == 1 ? yLine + line.height/2 : yLine + line.height/2 - 2;

				let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+"butBuyWindLives.png",218, yBut,162,48);
				butBuy.name = "but"+i;
				butBuy.onEL("pointerdown", pointerDownButBuy);
				butBuy.onEL("pointerup", pointerUpButBuy);
				yLine += line.height + 2;
			}
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] = 1;
				let listOfImages = [
					"winds/buyLives/backgrBuyLives.png",
					"winds/buyLives/butBuyWindLives.png",
					"winds/buyLives/lableBuyLives.png",
					"winds/buyLives/line1BuyLives.png",
					"winds/buyLives/line2BuyLives.png",
					"winds/buyLives/line3BuyLives.png",
					"winds/buyLives/line4BuyLives.png",
					"winds/buyLives/line5BuyLives.png",
					"winds/buyLives/line6BuyLives.png",
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindBuyLives.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindBuyLives;