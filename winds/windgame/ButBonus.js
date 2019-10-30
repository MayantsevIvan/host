	"use strict";
	
    let ButBonus = function( parent, fx, fy, name, type ) {
		let self = this;
		this.type = type;
		this.parent = parent;
		this.name = name;
		this._count = 0;
        Object.defineProperty( this, "count", {
	        get: function(   ) { return this._count; },		 
	        set: function(val) {
	    	    this._count = val;  
	    	    this.showNumber();
	    	}
	    });//count


		this.image = Handler.showImg( parent, 'bonus/'+name+".png", fx, fy );
		this.image.width /= 2;
		this.image.height  /= 2;

		
		this.count = User[name];
		this.image.onEL( "pointerdown", function(evt){ self.onClick(evt); } );
		return this;
    }; 
    ButBonus.prototype.showNumber = function( ) {
		if ( this.txtCount ) Handler.destroy( this.txtCount );
		if ( this.plus ) Handler.destroy( this.plus );
        let self = this;
      
        if ( this.count > 0 ) {
            let style = { parent: self.image, x:8, y:7, text: self.count };
			style.fontSize = 34;
			style.color = 0xEB4800;
			style.stroke = 0xffffff;
			style.strokeThickness = 6;
            this.txtCount = Handler.newText(style);  //JSJump????
			this.image.addChild(this.txtCount);
            this.txtCount.x -= Math.floor( this.txtCount.width/2 - this.image.width/2);			
            this.txtCount.y -= Math.floor( this.txtCount.height/2 - this.image.height/2);			
		} else {
			this.plus = Handler.showImgRect( self.image, "bonus/plus.png", self.image.width/2, self.image.height/2+4, 44, 44 );
			this.plus.name = 'plus';
		}
		return this;
	};
    ButBonus.prototype.onClick = function(evt) {
		if ( this.count > 0 && !this.type ) {
			if ( Consts.BONUSES_NAMES.indexOf( this.name ) < 0 ) return;
			this.hideCursor();
			
			if ( Handler.selBooster != 0 ) {
				Handler.selBooster = 0;
			} else {
				Handler.selBooster = this.name;
				this.initCursor(evt);
			}
		} else {
			Winds.show( Winds.WIND_BUY_BOOSTER,{ nameBon: this.name } );
		}
	};
    ButBonus.prototype.initCursor = function(evt) {
		console.log("curB"+this.name.substr(1));
		Handler.curB = Embeds["curB"+this.name.substr(1)]();
		
		Handler.curB.name = this.name;
		Handler.curB.anchor.set(0,0);
		Handler.curB.position.x = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
		Handler.curB.position.y = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
		
		pixiApp.stage.addChild( Handler.curB );
        pixiApp.stage.interactive = true;
		pixiApp.stage.on( "pointermove", Handler.curMove );
	};    
	ButBonus.prototype.hideCursor = function() {
        if ( Handler.curB != null ) {
			Handler.curB.destroy();
			Handler.curB = null;
		}
		pixiApp.stage.interactive = false;
		pixiApp.stage.off( "pointermove", Handler.curMove );
	};
    ButBonus.prototype.destroy = function( ) {
		this.image.destroy;
	};
    