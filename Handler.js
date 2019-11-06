	
	const Handler = {};
	
	Handler.isMobile = false;
	Handler.countGemsB = [];
	Handler.selBooster = 0;
	Handler.windsWithLoadedImages = [];
	Handler.catchError = null;
	Handler.onErrorCatched = function(err){
		alert( err.message );
		alert( err.stack );
		console.log(err);
		Log.onErrorCatched( err );
	};
	
	Object.defineProperty( Handler, "contentCenterX", {
		get:function(){ return pixiApp.screen.width / 2; }
	});
	Object.defineProperty( Handler, "contentCenterY", {
		get:function(){ return pixiApp.screen.height / 2; }
	});
	Handler.coordsShiftX = -270;
	Handler.coordsShiftY = -280;
	
	Handler.coordsWidth = 50;
	Handler.coordsHeight = 50;


	Object.defineProperty( Handler, "coordsShift", {
		get:function(){ return 4; }
	});
	Object.defineProperty( Handler, "contentWidth", {
		get:function(){ return pixiApp.screen.width; }
	});
	Object.defineProperty( Handler, "contentHeight", {
		get:function(){ return pixiApp.screen.height; }
	});

//	Handler.levelNum = parseInt(Head.levelName.substr(1));
	/*Object.defineProperty( Handler, "levelNum", {
	    get: function(   ) { return this.levelNum; },
	    set: function( val ) {    
            Handler.levelNum = val;
		}
	});*/
	
	Handler.curB = null;
	Handler.gemObjectLine = [];
	Handler.gemLine = [];
	Handler.flyPointsTable = [];
	Handler.gemSel = false;
	
	Handler.destroy = function( obj ) {
        if ( obj != null ) {
			try { if ( obj.parent != null ) obj.parent.removeChild( obj ); } catch(err){ }
            try { obj.removeChildren(); } catch(err){ }
            try { obj.destroy(); } catch(err){ }
            obj = null;
        };
    };
	
	Handler.removeAroundStone = function(){};	
	
	Handler.getCoEnFromServer = function() {
		BackClient.ask( BackClient.GET_COINS_AND_ENERGY, Handler.getCoEnAsked );
	};
	Handler.getCoEnAsked = function( r ) {
		Head.energy = r.energy_v;
		Head.bonus  = r.energy_u;
		Head.coins  = r.coins;
	};
	
	Handler.loadAndDrawRemoteImage = function( rgroup, url, file_name, ix, iy, iw, ih, fcallback ) {
		const loader = new PIXI.Loader();
		loader.add( file_name, url, { crossOrigin: false, loadType: 2 } );
		//loader.add( file_name, url, { crossOrigin:false, loadType: Resource.LOAD_TYPE.IMAGE } );
		const onImageLoaded = function() {
			let img = null;
			if ( iw == null || ih == null ) {
                fcallback = iw || fcallback;
                img = Handler.showImg( rgroup, file_name, ix, iy );
            } else {
                img = Handler.showImgRect( rgroup, file_name, ix, iy, iw, ih );
            };        
            if ( fcallback != null ) {
                fcallback(img);         
            }; 
		};
		loader.load( onImageLoaded );
		
     /*   function networkListener( event ) {
            if ( ( event.isError ) ) {          
                console.log("Error network");         
            } else if ( ( event.response == null ) ) {          
                console.log("event.response == null", url, file_name);                     
            } else if ( ( event.response.filename == null ) ) {          
                console.log("event.response.filename == null", url, file_name);         
            } else if ( ( event.phase == "ended" ) ) {          
                Handler.loadedPhotos[file_name] = event.response.filename;         
                let showImg = function() {          
                    let img = null;         
                    if ( iw == null || ih == null ) {          
                        img = Handler.showImgDir( rgroup, event.response.filename, ix, iy, event.response.baseDirectory )         
                    } else {        
                        img = Handler.showImgRectDir( rgroup, event.response.filename, ix, iy, iw, ih,event.response.baseDirectory )         
                    };        
                    if ( fcallback != null ) {           
                        fcallback(img);         
                    };         
                };         
                //JSJump.pcall(showImg);         
                showImg();         
            };        
        };        
                 
        let params = {};         
        params.progress = "download";         
        params.response = {};         
        //params.response.baseDirectory = system.TemporaryDirectory;         
        params.response.filename = file_name;         
         
        if ( Handler.loadedPhotos[file_name] == null ) {          
            network.request( url, "GET", networkListener,  params );          
        } else {        
            let showImg = function() {          
                let img = Handler.showImgRectDir( rgroup, Handler.loadedPhotos[file_name], ix, iy, iw, ih, params.response.baseDirectory )         
                if ( fcallback != null ) {           
                    fcallback(img);         
                };         
            };         
            JSJump.pcall(showImg);         
        };  */       
    }; 
	
	Handler.onStartLevel = function( resp ) {
		if ( parseInt(resp['nel']) == 1 ) {
	//		Handler.notEnoughtEnergy();
			Winds.show( Winds.WIND_BUY_LIVES );
		} else {
		//	Head.bottomPanel.visible = false;
			Head.energy 	= resp['energy_v'];
			Head.bonus 	    = resp['energy_u'];
			Head.coins  	= resp['coins'];
			Handler._response = resp;

			//let tmpLamp:Sprite = Head.instance.getLampsPanelLamp();
//			let tmpLamp = Head.getLampsPanelText();
//			let normalScaleX = tmpLamp.scaleX;
//			let normalScaleY = tmpLamp.scaleY;
//			tmpLamp.scaleX = normalScaleX*1.5;
//			tmpLamp.scaleY = normalScaleY*1.5;
			Sounds.playDzin();
//			TweenMax.to(tmpLamp,0.5,{scaleX:normalScaleX,scaleY:normalScaleY/*,onComplete:_flyLamps*/});
				//_flyLamps();
			Winds.show( Winds.WIND_GAME,{ lev: Handler._response['lev'], addTime: Handler._response['addT'] });
		}
	}

	Handler.onStartLevelClick = function( e ) {
		if (e.target.name == 'buttonFastStart') {
			Head.levelName = 'l'+Handler.cv( User.ml+1 );
		} else {
			Head.levelName = e.target.name;
		}
		if (parseInt(Head.levelName.substr(1)) > Head.maxLevels) 
			Head.levelName = 'l'+Handler.cv(Head.maxLevels);

		let tmpArr= ['l01','l02','l03','l1','l2','l3'];
		console.log(tmpArr.indexOf(Head.levelName));
		if ( tmpArr.indexOf(Head.levelName) != -1 && Head.energy > 0 ) {
			let fparams = {};
			fparams['l'] 		= Head.levelName;
			fparams['energy_v'] = Head.energy;
			fparams['coins'] 	= Head.coins;
			BackClient.ask(	BackClient.LEVEL_GET, Handler.onStartLevel,fparams  );
		} else {
			Winds.show(Winds.WIND_BEFORE_LEVEL,{ numLevel: e.target.numLevel,firstStart:true});
		}
	}
	
	Handler._onAskedDecBooster = function( res ) {
		User.bVL = res['bVL'];
		User.bGL = res['bGL'];
		User.bPL = res['bPL'];
		User.bMX = res['bMX'];
		User.bMT = res['bMT'];
		User.bCH = res['bCH'];
	};
	Handler.decBooster = function( name ) {
		if (this.curB != null && this.curB.parent != null) this.curB.parent.removeChild(this.curB);
		Handler.jlines.countSteps -= 1;
	//	Handler.jlines.stepsPanel.showNumber();
		if (Consts.BONUSES_NAMES.indexOf(name) == -1) return;
		Handler.butBonuses[ Consts.BONUSES_NAMES.indexOf( name ) ].count -= 1;
/*		if ( Winds.getUpWindName() == Winds.WINDS_GAME ) {
			Winds.getWind().decBooster(name);
		};*/
		let bonIndexes = [3,6,4];
		let num = Consts.BONUSES_NAMES.indexOf( name ); //надо сверить с сервером.
		
		BackClient.ask( BackClient.DEC_BOOSTER, Handler._onAskedDecBooster, { nb : bonIndexes[num] } );
	};
	
	Handler.indexXToCoords = function( fi ) { return Consts.coordsShiftX-25+Consts.coordsWidth*fi;  }
	Handler.indexYToCoords = function( fj ) { return Consts.coordsShiftY-25+Consts.coordsHeight*fj; }
	
	Handler.coordsXToIndex = function( fx ) { return Math.round(fx/(Consts.coordsWidth));  }
	Handler.coordsYToIndex = function( fy ) { return Math.round(fy/(Consts.coordsHeight)); }
	
	Handler.refrashGems = function( num,count=1 ) {
		if ( num<0 || num>9 ) return;
		let numLevel = parseInt( Head.levelName.substr(1));
		let o = GameTypes.info[numLevel];
		if ( parseInt(o['g'+num])== 0 ) return;		
		if (Handler.countGemsB[num] != null) {
			Handler.countGemsB[num].count += count;//1
			Handler.countGemsB[num].ctext.text = Handler.countGemsB[num].count+'/'+ parseInt(o['g'+num]);
			if ( Handler.countGemsB[num].count >= parseInt(o['g'+num]) ) {
				Handler.countGemsB[num].galka.visible = true;
				Handler.countGemsB[num].ctext.visible = false;
			};
		};
	};

	//Handler.contentCenterX = pixiApp.screen.width / 2;
	//Handler.contentCenterY = pixiApp.screen.height / 2;
	
	Handler.destroy = function( obj ) {
        if ( obj != null ) {
			//console.log('Handler.destroy: obj name is '+obj.name);
			if ( obj.parent != null ) obj.parent.removeChild( obj );

			let destroyAfterSecond = function() {
				if ( obj != null ) {
				    if ( obj.removeChildren != null ) {
					    obj.removeChildren();
					}
				    //obj.destroy();
					obj = null;
			    }
			}
            obj.visible = false;
			setTimeout( destroyAfterSecond, 5000 );

        }
    };
	
	Handler.addExtraMethods = function(obj) {
		obj.translate   = function( nx, ny ) { this.x = nx; this.y = ny; };
		obj.onEL        = function( evt, listener ) { this.buttonMode = true; this.interactive = true; this.on( evt, listener ); };
		obj.rotate      = function( degrees ) { this.angle = degrees; };
		obj.removeSelf  = obj.removeSelf  = function( ) { Handler.destroy( this ); };
		obj.scaleXY     = function(sx,sy) { this.scale.x = sx; this.scale.y = sy; };
		
		Object.defineProperty( obj, "isVisible", {
		    get: function(   ) { return this.visible; },		 
		    set: function(val) { this.visible = val; }
		});
		Object.defineProperty( obj, "scaleX", {
		    get: function(  ) { return this.scale.x; },		 
		    set: function(nx) { this.scale.x = nx;   }
		});
		Object.defineProperty( obj, "scaleY", {
		    get: function(  ) { return this.scale.y; },		 
		    set: function(ny) { this.scale.y = ny;   }
		});
		obj.toBack  = function() {
		    this.parent.sortableChildren = true;
			let minZIndex = 100;
			this.parent.children.map( function(n){ minZIndex = Math.min(n.zIndex,minZIndex); } );
			this.zIndex = minZIndex - 1; 
		};
		obj.toFront = function() {
		    this.parent.sortableChildren = true;
			let maxZIndex = 0;
			this.parent.children.map( function(n){ maxZIndex = Math.max(n.zIndex,maxZIndex); } );
			this.zIndex = maxZIndex + 1; 
		};
	};
	
	Handler.addChild = function( parent, child ) {
		if ( parent == Consts.WITHOUT_PARENT ) return;
	    if ( parent != null ) {
			parent.addChild( child );
	    } else {
			pixiApp.stage.addChild( child );
		}
	}
	
	Handler.newGroup = function( iparent ){
		let group = new PIXI.Container();
		if ( iparent != null ) {
			iparent.addChild( group );
		} else {
			pixiApp.stage.addChild( group );
		}
		Handler.addExtraMethods(group);
		return group;
	};

	Handler.curBooster = Handler.newGroup();
	Handler.windGameSprite = Handler.newGroup();
	
	Handler.showRect = function ( iparent, ix, iy, iw, ih, color, widthLine, colorLine ){
		const graphics = new PIXI.Graphics();
		graphics.lineStyle(  widthLine, colorLine );
		graphics.beginFill(color);
		graphics.drawRect(ix-iw/2, iy-ih/2, iw, ih);
		if( iparent != null ){
			iparent.addChild(graphics);
		}
		graphics.endFill();
		Handler.addExtraMethods(graphics);
		return graphics;
	}
	
	Handler.showRoundedRect = function ( iparent, ix, iy, iw, ih, color, angle, widthLine, colorLine ){
		const graphics = new PIXI.Graphics();
		graphics.lineStyle(  widthLine, colorLine );
		graphics.beginFill(color);
		graphics.drawRoundedRect(ix, iy, iw, ih, angle);
		if( iparent != null ){
			iparent.addChild(graphics);
		}
		graphics.endFill();
		Handler.addExtraMethods(graphics);
		return graphics;
	}
	
	Handler.showImg = function( iparent, ipath, ix, iy ){
		const texture = PIXI.Texture.from( ipath );
		texture.baseTexture.on('loaded', function() {
			console.log('just do it');
		});
		let img = PIXI.Sprite.from( texture );
		Handler.addChild( iparent, img );
		img.anchor.set(0.5);
		img.x = ix /*- Math.floor( img.width/2 )*/;
		img.y = iy /*- Math.floor( img.height/2)*/;
		/*img.x =Math.floor( ix -  img.width/2 );
		img.y = Math.floor(iy -   img.height/2 );*/
		Handler.addExtraMethods(img);
		return img;
	}
	
	Handler.showImgRect = function( iparent, ipath, ix, iy, iw, ih ){
		const texture = PIXI.Texture.from( ipath );
		texture.interactive = true;
		texture.baseTexture.on('loaded', function() {
			console.log('just do it');
		});
		let img = PIXI.Sprite.from( texture );
		Handler.addChild( iparent, img );
		if ( iw != null && ih != null ){
			img.width  = iw;
			img.height = ih;
		};
		img.anchor.set(0.5);
		img.x = ix /*- Math.floor( img.width/2 )*/;
		img.y = iy /*- Math.floor( img.height/2)*/;
		Handler.addExtraMethods(img);
		return img;
	};
	
	Handler.newText = function( params ) {
		params = params || {};
		params.fontFamily = params.fontFamily || 'Arial';
		params.fontSize   = params.fontSize*2 || 22;
		params.strokeThickness = params.strokeThickness*2 || 0;
		params.lineJoin   = params.lineJoin   || 'round';
		params.fontWeight = params.fontWeight || 'bolder';
		params.fill       = params.color      || '#ffffff';
		params.parent     = params.parent     || pixiApp.stage;
		//
		const style = new PIXI.TextStyle( params );
		const richText = new PIXI.Text( params.text || '', style );
		richText.scale.set(1/2);
		if ( !params.anchorCenter ) {
			richText.x = params.x || 0;
			richText.y = params.y || 0;
		} else {
			richText.x = params.x - richText.width/2 || 0;
			richText.y = params.y - richText.height/2|| 0;
		}
		
		richText.roundPixels  = true;
		richText.anchor.set(0, 0);

		params.parent.addChild(richText);

		return richText;
	};
	
	Handler.showImgRectAfterLoaded = function( iparent, ipath, ix, iy, iw, ih, callback ) {
		const texture = PIXI.Texture.from( ipath );
		console.log('startLoadTexture');
		texture.interactive = true;
		texture.baseTexture.on('loaded', function() {
			console.log('loadTexture');
			let img = Handler.showImgRectBase( iparent, texture, ix, iy, iw, ih, callback );
		});
	};
	
	Handler.showImgRectBase = function( iparent, itexture, ix, iy, iw, ih, callback ) {
		let img = PIXI.Sprite.from( itexture );
		Handler.addChild( iparent, img );
		if ( iw != null && ih != null ){
			img.width  = iw;
			img.height = ih;
		};
		img.anchor.set(0.5);
		img.x = ix /*- Math.floor( img.width/2 )*/;
		img.y = iy /*- Math.floor( img.height/2)*/;
		Handler.addExtraMethods(img);
		if ( callback ) callback( img );
		return img;
	};
	
	Handler.showNumber = function( fname, cx, cy, num, nw, nh, gParent, dir, shift=0 ) {
		let gNumber = Handler.newGroup( gParent );
		gNumber.translate( cx, cy );

		let str = num+'';
	
		for ( let i = 0; i<str.length; i++ ) {
			let ch = str.substr(i,1);
			let newX = nw*i-shift*i;
            Handler.showImgRect( gNumber, dir+fname+ch+".png", newX,0, nw, nh );
		};
		return gNumber;
    };
	
	Handler.curMove = function(e) {
		if ( Handler.curB != null && e != null ) {
		    if ( e.data != null && e.data.global != null ) {
		        Handler.curB.position.x = Math.floor( e.data.global.x / pixiApp.stage.scale.x );
		        Handler.curB.position.y = Math.floor( e.data.global.y / pixiApp.stage.scale.y );
			};
	    };
	};
	
	Handler.showWindBackround = function ( fx, fy, fwidth, fheight, nameAng, nameSide, rcolor ) {
		const self = this;
		const group = Handler.newGroup();
		const eWidth = 100;
		const eHeight = 100;
		const angle1 = self.showImgRect( group, nameAng, fx+eWidth/2,fy+eHeight/2,eWidth,eHeight );

		const angle2 = self.showImgRect( group, nameAng, fx-eWidth/2+fwidth,fy+eHeight/2,eWidth,eHeight );
		angle2.angle = 90;

		const side1 = self.showImgRect( group, nameSide, fx+eWidth+fwidth/2-eWidth,fy+eWidth/2,eWidth,fwidth-eWidth*2);
		side1.angle = 90;

		const angle3 = self.showImgRect( group, nameAng, fx+eWidth/2, fy+eHeight/2+fheight-eHeight,eWidth,eHeight);
		angle3.angle = 270;

		const side2 = self.showImgRect( group, nameSide, fx+eWidth/2, fy+fheight/2, eWidth,fheight-eHeight*2);
		side2.angle = 0;

		const side3 = self.showImgRect( group, nameSide, fx+fwidth/2, fy-eHeight/2+fheight,eWidth,fwidth-eWidth*2);
		side3.angle = 270;

		const angle4 = self.showImgRect( group, nameAng, fx-eWidth/2+fwidth, fy-eHeight/2+fheight,eWidth,eHeight);
		angle4.angle = 180;

		const side4 = self.showImgRect( group, nameSide, fx-eWidth/2+fwidth,fy+eHeight+side2.height/2,eWidth,fheight-eHeight*2);
		side4.angle = 180;

		const rect = self.showRect(group,fx+eWidth+side1.height/2,fy+eHeight+side2.height/2,side1.height,side2.height,rcolor);
		return group;
	};
	
	Handler.showText = function( iparent, txt, x, y, params ){
		const txtObj = new PIXI.Text(txt, params);
		if ( iparent != null ) {
			iparent.addChild( txtObj );
		}
		txtObj.x = Math.floor( x - txtObj.width/2 );
		txtObj.y = Math.floor( y - txtObj.height/2 );;
		
		return txtObj;
	};
	

	Handler.colorLuaToHex = function( col, with255=true ) {
		const mul = with255 ? 255 : 1;
		let res = '0x';
		for ( const c of col ) {
			if ( c*mul > 9 ) res += (Math.floor(c*mul)).toString(16)
			else             res += '0'+(Math.floor(c*mul)).toString(16)
		}
		return res;
	};

	
	Handler.removeGroupChilds = function( group ){
		if ( group.children.length < 1 ){
			return true;
		}
		let fi = 1;
		for ( fi = group.children.length; 0 < fi; fi-- ) {
			//console.log(fi);
			group.children[fi-1].destroy();
		}
		return true;
	}
	
	Handler.removeWindAfterTransition = function( img ) {
		console.log( img );
		if( img != null ) {
			let remimg = function() { 
				img.destroy();
			}
			let newy = pixiApp.height+200;
			console.log( newy );
			let removeImg = function(){
				try {//pcall( remimg );
					remimg();
					img = null;
				} catch ( ex ) {
					Handler.onErrorCatched(ex);
				};
			}
			TweenMax.to( img, Consts.TIME_WINDOW_MOVE, { y:newy, alpha: 0.3, onComplete: removeImg } );
			//transition.to( img, { time=Consts.TIME_WINDOW_MOVE, y=newy, alpha=0.3, onComplete=removeImg } );
			//transition.to( img, { time=300, y=newy, alpha=0.3, onComplete=removeImg } );
		}
	}
	
	/*Handler.setMaskOnPhoto = function( iparent, myImage, photoWidth, photoHeight ) {
		myImage.x += myImage.width/2;
		myImage.y += myImage.height/2;
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xDE3249);
		graphics.drawRect(myImage.x+myImage.width/2-photoWidth/2, myImage.y+myImage.height/2-photoWidth/2, photoWidth, photoWidth );
		iparent.addChild(graphics);
		graphics.endFill();
		//myImage.mask = graphics;
		
		let pwidth  = photoWidth  != null && photoWidth || 80;
		let pheight = photoHeight != null && photoHeight || 80;

		let shifty = 0;
		if ( myImage.width < myImage.height ) {
			
		} else {
			let sc = pheight / myImage.height;
			
			myImage.height = pheight;
			//myImage.width = myImage.width * sc;
			//console.log(  " sc, myImage.width ", sc, myImage.width );
			console.log(  "y", graphics.y );
			console.log(  "y", myImage.y );
		}
		myImage.updateTransform();
	}*/
	
	Handler.setMaskForImg = function ( iparent, myImage, imgW, imgH ) {
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xDE3249);
		graphics.drawRect(myImage.x-imgW/2, myImage.y-imgH/2, imgW, imgH );
		iparent.addChild(graphics);
		graphics.endFill();
		myImage.mask = graphics;
	};
	
	Handler.setMaskOnPhoto = function( iparent, myImage, photoWidth, photoHeight ) {
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xDE3249);
		graphics.drawRect(myImage.x-photoWidth/2, myImage.y-photoWidth/2, photoWidth, photoWidth );
		iparent.addChild(graphics);
		graphics.endFill();
		myImage.mask = graphics;
		
		let pwidth  = photoWidth  != null && photoWidth || 80;
		let pheight = photoHeight != null && photoHeight || 80;

		let shifty = 0;
		if ( myImage.width < myImage.height ) {
			let sc = pwidth / myImage.width;
			myImage.width = pwidth;
			myImage.height = myImage.height * sc;
			shifty = ( myImage.height - pheight ) / 2;
		} else {
			let sc = pheight / myImage.height;
			myImage.height = pheight;
			myImage.width = myImage.width * sc;
		};
		myImage.updateTransform();
	};
	
	Handler.transition_to = function( obj, params ) {
		if ( obj         == null ) return;
		if ( params      == null ) return;
		if ( params.time == null ) return;

		const time = params.time / 1000;
		params.delay = params.delay != null ? params.delay / 1000 : 0;
		delete params.time;
		params.ease = params.ease || Power0.easeNone;
		if ( obj == null ) return;
		TweenMax.to( obj, time, params );
	};
	
	Handler.toBack = function( obj ) {
		if ( obj.parent != null ) {
			obj.parent.sortableChildren = true;
			obj.zIndex = obj.parent.zIndex - 1;
		};
	};
	
	Handler.toFront = function( obj ) {
		if ( obj.parent != null ) {
			obj.parent.sortableChildren = true;
			obj.zIndex = obj.parent.zIndex + 1;
		};
	};
	Handler.cv = function( val ) {
		return (val>9)?val+'':'0'+val;
	};
	Handler._initFlyPointsTable = function() {
		if ( this.flyPointsTable == null ) {
			let w = Handler.jlines.cx;
			let h = Handler.jlines.cy;
			this.flyPointsTable = [];
			for (let i=0;i<w;i++) {
				if (this.flyPointsTable[i] == null) this.flyPointsTable[i]  = [];
				for (let j=0;j<h;j++) {
					this.flyPointsTable[i][j] = 0;
				};
			};
		};
	};
	
	Handler.removeImage = function( img ) {
        if ( img != null ) {
            let remimg = function() {  img.removeSelf(); };         
			try {
				remimg();
			} catch(err) {
				console.log(err);
			}
	//		JSJump.pcall( remimg );         
            img = null;         
        };         
    };
	
	/*Handler._onFlyPointsTimerTick = function(fi,fj) {
		let middlex = 0; let middley = 0; let countPC = 0;
		let fpoints = 0;
		let w = Handler.jlines.cx;
		let h = Handler.jlines.cy;
		if (this.flyPointsTable == null) this.flyPointsTable = [];
		for ( let i=0; i<w; i++ ) {
			if ( this.flyPointsTable[i] == null ) this.flyPointsTable[i] = [];
			for ( let j=0; j<h; j++ ) {
				if ( this.flyPointsTable[i][j] == null ) this.flyPointsTable[i][j] = 0;
				if ( this.flyPointsTable[i][j] != 0 ) {
					countPC++;
					middlex += i;
					middley += j;
					fpoints += this.flyPointsTable[i][j];
					this.flyPointsTable[i][j] = 0;
				}
			}
		}
		//let fpoints:int = flyPointsTable[fi][fj];
		//flyPointsTable[fi][fj] = 0;
		if (fpoints != 0) {
			fpoints = Math.floor(fpoints);
			let px = Math.floor(Handler.indexXToCoords(middlex/countPC));//Handler.indexXToCoords(fi);
			let py = Math.floor(Handler.indexYToCoords(middley/countPC));//Handler.indexYToCoords(fj);
			let ps = Handler.jlines.gemsContainer.parent;
			let fp = new FlyPoints( fpoints, px-20,py, true, ps);
			Handler.jlines.pointsPanel.countPoints += fpoints;
		};
	};
	
	Handler.flyPointsStart = function ( fi, fj, fpoints ) {
		this._initFlyPointsTable();
		let self = this;
		if ( this.flyPointsTable == null ) this.flyPointsTable = [];
		if ( this.flyPointsTable[fi] == null ) this.flyPointsTable[fi] = [];
		if ( this.flyPointsTable[fi][fj] == null ) this.flyPointsTable[fi][fj] = 0;
			
		this.flyPointsTable[fi][fj] += fpoints;
		
		setTimeout( function(){ self._onFlyPointsTimerTick( fi, fj ) } , 151);

		//TweenLite.to(new Sprite(),0.3,{onComplete:,onCompleteParams:[fi,fj]});
	};*/

	Handler.onEndLevel = function() {
//		alert('Handler.onEndLevel');
		let self = this;
		//return;
		if (EndLevelAnimator.animation) return;
		//animaciya ostavshihsya hodov
		GameHelper.stop();
		let tmpArr = ['l01','l02','l03','l1','l2','l3'];
		if ( tmpArr.indexOf(Head.levelName) != -1) {
			Handler.countEndTime = 10;
		};
		
		//if (Handler.jlines.deltaSteps > 0) Handler.countScore += 60*Handler.jlines.countSteps;
		//endLevelCallback();
		let endLevelCallback = function() {
			let fparams = {};
			//fparams.bp 		= (User.bonus!=null)? User.bonus.countBonus: 0;//bonus points
			//fparams.lk 		= User.levelKey;
			//fparams.sc 		= (User.score!=null)? User.score.countPoints: 0;	
			fparams.nln 	= Head.levelName;
			fparams.oid 	= User.viewer_id;
			fparams.coins	= User.coins;
			fparams.exp 	= Head.exp;
			fparams.hz		= Handler.jlines.pointsPanel.countPoints;
			fparams.time	= Handler.countEndTime;
			fparams.cs 		= Handler.jlines.stepsPanel.countSteps;
				
			//Winds.show( Winds.WIND_END_LEVEL, stats );
		    BackClient.ask(BackClient.LEVEL_FINISH,function(r){ self.onEndLevelAsked(r); },fparams);
		};
		EndLevelAnimator.showEndLevel( endLevelCallback );
	};//onEndLevel
	
	Handler.onEndLevelAsked = function( resp ) {
		let numLevel = parseInt(Head.levelName.substr(1));
		
		if ( Head.maxLevels < resp['maxLevels'] ) {
			Head.maxLevels = resp['maxLevels'];
		}
		
		Head.exp   		 = resp['exp'];
		Head.coins 		 = resp['coins'];
		Head.energy		 = resp['energy_v'];
		Head.bonus		 = resp['energy_u'];
		User.ml    		 = resp['ml'];
		User.puznum    	 = resp['puznum'];

		User.puzzlenum   = resp['puzzlenum'];
		
		if (User.stars[numLevel] == null) User.stars[numLevel]	= resp.stars;
		if (User.stars[numLevel] != null && User.stars[numLevel]['s'] < resp.stars['s']) User.stars[numLevel]	= resp.stars;
		
		let j = numLevel+1;
		
		//Head.instance.enableButLevel('l'+Handler.cv(j), resp['stars']['s']);
		/*for (let i:int=0;i<Head.instance.menuLevels.length;i++) {
			(Head.instance.menuLevels[i] as MenuLevel).refrashCols();
		}*/
		/*if ( Winds.getTopWindName() == Winds.WIND_SMALL_ACT_INV ) {
	        Winds.shutdownTopWind(1);
    	}
		if ( Winds.getTopWindName() == Winds.WIND_ACT_5_STEPS ) {
	        Winds.shutdownTopWind(1);
    	}*/
		if ( Winds.getTopWindName() == Winds.WIND_GAME ) {
			clearTimeout( Handler.timerOpenAcInv );
	        Winds.shutdownTopWind(1);
    	}		
		/*if ( Winds.getUpWindName() == Winds.WINDS_ACT3BOOSTERS ) {
			Winds.getWind().shutdown();
		}
		if ( Winds.getUpWindName() == Winds.WINDS_ACT4 ) {
			Winds.getWind().shutdown();
		}
		if ( Winds.getUpWindName() == Winds.WINDS_GAME ) {
			Winds.getWind().shutdown();
		}
		if ( User.instance.actInv < 11 && Config.NETWORK == 'ok' ) {
			Winds.show(Winds.ACT_INVITE_BG3);
		}*/
		/*if ( User.instance.actJP < 1 && Config.NETWORK == 'ok' ) {
			Winds.show(Winds.ACT_INVITE_JP);
		} else if (User.instance.actInv < 5 && Config.NETWORK == 'ok' ) {
			Winds.show(Winds.ACT_INVITE_JQ);
		} else if (User.instance.actInv < 8 && Config.NETWORK == 'ok' ) {
			Winds.show(Winds.ACT_INVITE_FM);
		}*/
		CWindMenuLevels.initStats();
		CWindMenuLevels.showLocation();
		
//		let stats = {
//			points: Handler.jlines.pointsPanel.countPoints, 
//			countStars: Handler.jlines.pointsPanel.countStars,
//			countIgnots: 1
//		};
		
		Winds.show(Winds.WIND_END_LEVEL, {
			points:		resp['addExp'],		
			coins: 		resp['addCoins'],
			addPuzPrz: 	resp['addPuzPrz'],
			addColNum: 	resp['addColNum'],
			addHead: 	resp['addHead'],
			stars: 		resp['stars']['s'],
			nln: Head.levelName
		});
	};
	
	Handler.pcall = function(func) {
		try {
			func();
		} catch(err) {
		    console.log(err);
		}
    };
	
	Handler.transition_to = function( obj, params ) {
		const time = params.time / 1000;
		params.delay = params.delay != null ? params.delay / 1000 : 0;
		delete params.time;
		params.ease = params.ease || Power0.easeNone;
		TweenMax.to( obj, time, params );
	};
	
	Handler.removeWindAfterTransition = function( img ) {
        let self = this;
        if ( img != null ) {
            let remimg = function() { img . removeSelf(); };
            let newy = pixiApp.screen.height;
            let removeImg = function() {
                Handler.pcall( remimg );
//                JSJump.pcall( remimg );
                img = null;
            };

            Handler.transition_to( img, { time:Consts.TIME_WINDOW_MOVE, y:newy, alpha:0.2, onComplete:removeImg } );
        };
    };
	
	Handler.toNumber = function( val ) {
        return Number( val.replace(',', '.') );
    };
    Handler.isValidFloat = function( val ) {
        return !Number.isNaN( Handler.toNumber( val ) );
    };
    Handler.isValidInteger = function( val ) {
       return Number.isInteger( Handler.toNumber( val ) );
    };
	
	Handler.showAnimSprite = function( iparent, idata, ix, iy, iw, ih, speed, withAnchor=true ) {
        //let idata = ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];
		let textureArray = [];
		if ( idata.points ) {//create from texture atlas
			let atlas = new PIXI.BaseTexture.from( idata.path );

            for ( let i=0; i<idata.points.length; i++ ) {
				let t = null;
				if ( idata.orientation == Consts.GORIZONT_ANIM ) {
			        t = new PIXI.Texture( atlas, new PIXI.Rectangle( idata.points[i]*i, 0, idata.points[i], atlas.height ) );
				} else {
					t = new PIXI.Texture( atlas, new PIXI.Rectangle( 0, idata.points[i]*i, atlas.width, idata.points[i]  ) );
				}
                let texture = { texture: t, time: speed };//820 anim speed for gemSuper
                textureArray.push( texture );
            };
		} else {
            for ( let i=0; i < idata.length; i++ ) {
                //let texture = { texture: PIXI.Texture.from( idata[i] ), time: speed };//820 for gemSuper
                //textureArray.push( texture );

                let texture = PIXI.Texture.from( idata[i] );
                textureArray.push( texture );
				//pixiApp.renderer.bindTexture(texture)
            };
		}
		let anim = new PIXI.AnimatedSprite( textureArray );

		Handler.addChild( iparent, anim );

        anim.width  = iw || anim.width;
        anim.height = ih || anim.height;

        if ( withAnchor ) anim.anchor.set(0.5);
        anim.x = ix + (iw % 2)*0.5*withAnchor;
        anim.y = iy + (iw % 2)*0.5*withAnchor;

        Handler.addExtraMethods( anim );
        if ( idata.points == null ) anim.animationSpeed = speed || anim.animationSpeed;

		return anim;
    };
	
	Handler.timersPaused = {};
	Handler.timer_cancel = function( idInt ) {
		Handler.timersPaused[ 'tid'+idInt ] = null;
		clearInterval( idInt );
	};
	Handler.timer_pause = function( idInt ) {
		Handler.timersPaused[ 'tid'+idInt ] = true;
	};
	Handler.timer_resume = function( idInt ) {
		Handler.timersPaused[ 'tid'+idInt ] = null;
	};
    Handler.timer_performWithDelay = function( delay, func, iter=1 ) {
        let count = 0;
        let ticker = function() {
			try {
				if ( Handler.timersPaused[ 'tid'+idInt ] == null ) {
					func();
					count++;
					if ( count == iter && iter != 0 && iter != -1 ) {
						clearInterval( idInt );
					}
				}
			} catch ( ex ) {
				Handler.onErrorCatched(ex);
			};
        };
        let idInt = setInterval(ticker, delay);
		return idInt;
	};
	
	Handler.isDV = function() {
		return Config.NETWORK == Consts.NETWORK_DV;
	};
	
	
	Handler.getUserSrvData = function () {
		BackClient.ask(BackClient.GET_USER_DATA,this._getUserDataAsked);
	}
	
	Handler._getUserDataAsked = function (resp) {
		Head.energy 	= resp['energy_v'];
		Head.bonus 	    = resp['energy_u'];
		Head.coins  	= resp['coins'];

		if ( User.bGL < resp.bGL ) addBooster( 1, int(resp.bGL - User.bGL) );
		if ( User.bVL < resp.bVL ) addBooster( 2, int(resp.bVL - User.bVL) );
		if ( User.bPL < resp.bPL ) addBooster( 3, int(resp.bPL - User.bPL) );
		if ( User.bMT < resp.bMT ) addBooster( 4, int(resp.bMT - User.bMT) );
		if ( User.bCH < resp.bCH ) addBooster( 5, int(resp.bCH - User.bCH) );
		if ( User.bMX < resp.bMX ) addBooster( 7, int(resp.bMX - User.bMX) );

		if ( resp['stepsAdded'] > 0 ) {
			//if ( resp['stepsAdded'] == 1 ) Detonations.free3DownLines();
			//if ( resp['stepsAdded'] == 2 ) addBooster(6); //add super gem
			if ( resp['stepsAdded'] == 5 ) addSteps();   //add 5 steps
			//if ( resp['stepsAdded'] == 10 ) add10Steps();  //add 10 steps
			BackClient.ask(BackClient.ERASE_STEPS,function(res){});
		}
		if ( resp['levfin'] > 0 ) {
			this.levelFinish();
		}
	}
	
	Handler.levelFinish = function () {
		/*if ( Winds.getUpWindName() == Winds.WINDS_LEV_FINISH) {
			Winds.getWind().shutdown(0);
		}*/
		if ( Winds.getTopWindName() == Winds.WINDS_LEV_FINISH ) {
	        Winds.shutdownTopWind(1);
    	}
		
		BackClient.ask(BackClient.BUY_LEV_FIN, this._onBuyLevFin,{});
	};
	
	Handler._onBuyLevFin = function (resp) {
		let numLevel = parseInt(Head.levelName.substr(1));

		Head.exp   			= resp['exp'];
		Head.coins 			= resp['coins'];
		Head.energy			= resp['energy_v'];
		Head.bonus			= resp['energy_u'];
		User.ml    			= resp['ml'];

		if (User.stars[numLevel] == null) User.stars[numLevel]	= resp.stars;
		if (User.stars[numLevel] != null && User.stars[numLevel]['s'] < resp.stars['s']) User.stars[numLevel]	= resp.stars;

		let j = numLevel+1;
		//Head.enableButLevel('l'+Handler.cv(j), resp['stars']['s']);

		/*if ( Winds.getUpWindName() == Winds.WINDS_GAME ) {
			Winds.getWind().shutdown();
		}*/
		if ( Winds.getTopWindName() == Winds.WINDS_GAME ) {
	        Winds.shutdownTopWind(1);
    	}
		Winds.show(Winds.WINDS_END_LEVEL, {
			points:		resp['addExp'],
			coins: 		resp['addCoins'],
			addPuzPrz: 	resp['addPuzPrz'],
			addColNum: 	resp['addColNum'],
			addHead: 	resp['addHead'],
			stars: 		resp['stars']['s'],
			nln: Head.levelName
		});
	}
	
	Handler.addSteps = function () {
		/*if ( Winds.getUpWindName() == Winds.WINDS_STEPS_LEFT) {
			Winds.getWind().shutdown(0);
		}*/
		
		if ( Winds.getTopWindName() == Winds.WINDS_STEPS_LEFT ) {
	        Winds.shutdownTopWind(0);
    	}
		Handler.jlines.countSteps = 5;
		Handler.jlines.timerHelpColor.start();
		/*let w:WindStepsLeft = (Winds.getWind() as WindStepsLeft);
		if (w != null) {
			w.shutdown(0);
		}*/
	}
	
	Handler.add9Steps = function() {
		/*if ( Winds.getUpWindName() == Winds.WINDS_STEPS_LEFT) {
			Winds.getWind().shutdown(0);
		}*/
		if ( Winds.getTopWindName() == Winds.WINDS_STEPS_LEFT ) {
	        Winds.shutdownTopWind(0);
    	}
		Handler.jlines.countSteps += 9;
		Handler.jlines.timerHelpColor.start();
	}
	
	Handler.add10Steps = function () {
		/*if ( Winds.getUpWindName() == Winds.WINDS_STEPS_LEFT) {
			Winds.getWind().shutdown(0);
		}*/
		if ( Winds.getTopWindName() == Winds.WINDS_STEPS_LEFT ) {
	        Winds.shutdownTopWind(0);
    	}
		Handler.jlines.countSteps += 10;
		Handler.jlines.timerHelpColor.start();
	}

	Handler.addBooster = function (num,count=1) {
		if ( num < 0 || num > 2 ) return;
        let names = ['bPL','bMX','bMT'];
		User[ names[num] ] += count; 
		if ( Handler.butBonuses[num] ) {
			  Handler.butBonuses[num].count = User[ names[num] ];
	    }
	}
	