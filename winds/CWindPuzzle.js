	
	"use strict";
	
	let CWindPuzzle = {};
	//CWindPuzzle.__index = CWindPuzzle;
	
	CWindPuzzle.newObject = function(){
		let self = this;
		return self;
	}
	
	CWindPuzzle.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		let showContent = function(){
			let backgr = Handler.showWindBackround(0, 0, 760, 482, Consts.DIR_PUZZLE + 'mWindPuzzleAngle.png', Consts.DIR_PUZZLE + 'mWindPuzzleSide.png',0xf3d8ac);
			self.mainGroup.addChild(backgr);
			let backgrImg = Handler.showWindBackround(10, 20, 440, 440, Consts.DIR_PUZZLE + 'windImgPuzzleAngle.png', Consts.DIR_PUZZLE + 'windImgPuzzleSide.png',0xf4cb9a);
			self.mainGroup.addChild(backgrImg);
			let cross = Handler.showImgRect(self.mainGroup, Consts.DIR_PUZZLE + "crossWindPuzzle.png",730,30,29,25);
			cross.onEL( 'pointerdown', function() { self.shutdown() }  );
			Handler.showImgRect(self.mainGroup, Consts.DIR_PUZZLE + "title_puzl.png",600,90,260,117);

			let arrayWord = [];
			for( let i = 0; i <= Langs.WORD_PUZZLE.length - 1; i++){
				let fChar = Langs.WORD_PUZZLE.substring(i,i+1)
				if ( Consts.ALF.indexOf( fChar ) != null ) {
					arrayWord[arrayWord.length] = fChar;
				}
			}

			let l = 20 - arrayWord.length;
			
			for( let k = 0; k < l; k++ ) {
				let rndCh = Consts.ALF[Math.round(Math.random() * (Consts.ALF.length-1 - 1) + 1)];
				arrayWord[arrayWord.length] = rndCh;	
			}
			
			for ( let i = 0; i < arrayWord.length; i++ ) {	
				let a = Math.round(Math.random() * (arrayWord.length-1 - 1) + 1);
				let g = arrayWord[i];
				arrayWord[i] = arrayWord[a];
				arrayWord[a] = g;	
			}
			
			let strPob  = "";
			let arrayBox = [];
			let charNub = [];
			let corCharX = [];
			let corCharY = [];
			let posX = 0;
			let posY = 0;
			let box_count = 0;
			let charImgW = 50;
			let charImgH = 50;
			
			let numFilledChar = 0;
			let numImgCharTouch = [];
			let moveCharBack = function() {	
				for(let i = 0; i <= numImgCharTouch.length-1; i++){
					TweenMax.to(imgChar[numImgCharTouch[i]],1, { x:corCharX[i], y:corCharY[i],width:charImgW,height:charImgH, interactive:true });
				}
				numFilledChar = 0;
			}
			let onChar = function(event) {
				if( event.target.interactive == true && numFilledChar != arrayBox.length){
					numImgCharTouch[numFilledChar] = event.target.num;
					corCharX[numFilledChar] = event.target.x;
					corCharY[numFilledChar] = event.target.y;
					event.target.interactive = false;
					TweenMax.to(event.target, 1, { x:arrayBox[numFilledChar].x, y:arrayBox[numFilledChar].y,width:arrayBox[numFilledChar].width,height:arrayBox[numFilledChar].height });
					numFilledChar = numFilledChar + 1;
					strPob = strPob + event.target.name;
				}
				if (numFilledChar == arrayBox.length) {
					console.log(strPob);
					if ( strPob == Langs.WORD_PUZZLE) {
						console.log("win!");
					} else {
						console.log("loss!");
					}
				}
				return true;
			}
			
			let xBoxForChar = 470;
			for ( let i = 0; i <= Langs.WORD_PUZZLE.length-1; i++ ) {
				arrayBox[i] = Handler.showImgRect(self.mainGroup, Consts.DIR_PUZZLE + 'char_box.png',xBoxForChar,400,30,30);
				arrayBox[i].name = "b"+i;
				arrayBox[i].zIndex = 0;
				console.log();
				xBoxForChar = xBoxForChar + 35;
			}
			
			let imgChar = [];
			let xChar = 498;
			let numChar = 0;
			for ( let i = 0; i <= 4;i++ ) {
				let yChar = 190;
				for ( let j = 0; j <= 3;j++ ) {
					let charname = "char/c"+Consts.ALF.indexOf( arrayWord[numChar] );
					imgChar[numChar] = Handler.showImgRect(self.mainGroup, Consts.DIR_PUZZLE + charname +'.png',xChar,yChar,charImgW,charImgH);
					imgChar[numChar].num = numChar;
					imgChar[numChar].name = arrayWord[numChar];
					imgChar[numChar].zIndex = 1;
					imgChar[numChar].touch = true;
					imgChar[numChar].interactive = true;
					imgChar[numChar].buttonMode = true;
					imgChar[numChar].on("pointerdown", onChar);
					yChar = yChar + imgChar[i].height+2;
					numChar = numChar + 1;
				}
				xChar = xChar + imgChar[i].width+2;
			}
			
			let boxCancel = Handler.showImgRect(self.mainGroup, Consts.DIR_PUZZLE + "cross_box.png",470,440,30,30);
			boxCancel.interactive = true;
			boxCancel.buttonMode = true;
			boxCancel.on("pointerdown",moveCharBack);
			let touchCross = function(event){
			};
			
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] = 1;
				listOfImages = [
					"winds/puzzle/mWindPuzzleAngle.png",
					"winds/puzzle/mWindPuzzleSide.png",
					"winds/puzzle/windImgPuzzleAngle.png",
					"winds/puzzle/windImgPuzzleSide.png",
					"winds/puzzle/crossWindPuzzle.png",
					"winds/puzzle/title_puzl.png",
					"winds/puzzle/char_box.png"
				];
				for ( let i = 0; i <= 32; i++){
					listOfImages.push("winds/puzzle/char/c"+i+'.png');
				};
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindPuzzle.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindPuzzle;