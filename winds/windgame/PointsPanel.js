	"use strict";
	
    let PointsPanel = {};
    PointsPanel._countPoints = 0;
	PointsPanel.countStars = 0;
	
	Object.defineProperty( PointsPanel, "countPoints", {
	    get: function(   ) { return this._countPoints; },		 
	    set: function(val) { 
		    this._countPoints = val;
			this.showNumber();
		    
		    this.star1.visible = this.countPoints >= this.pointsFor1Star;
			if ( this.star1.visible ) this.countStars = 1;
            this.star2.visible = this.countPoints >= Math.floor(this.pointsFor1Star*1.2);
			if ( this.star2.visible ) this.countStars = 2;
            this.star3.visible = this.countPoints >= Math.floor(this.pointsFor1Star*1.4);
			if ( this.star3.visible ) this.countStars = 3;
			
			let per = this._countPoints / this.maxPoints;
			if ( per > 1 ) per = 1;
            this.scaled.mask.y = -1*Math.floor( 112 * per );    
		}
	});
   
    PointsPanel.init = function( parentGroup, pointsFor1Star ) {
		Handler.destroy( this.group );
		
		this.pointsFor1Star = pointsFor1Star;
		this.maxPoints	    = Math.floor( pointsFor1Star*1.4 );
		
	    this.group = Handler.newGroup( parentGroup );
		this.group.x = isMobile ?  150 : -320;
		this.group.y = isMobile ? -334 : -205;
 		this.back = Handler.showImgRect( this.group, "panelPointWindGame.png", 0, 0, 103, 123 );
		
		this.scaled = Handler.showImgRect( this.group, "linePointWindGame.png", -37, 0, 19, 112 ); 
		this.scaled.mask = Handler.showRect( this.group, -36, 112, 21, 112 );

		this.star3 = Handler.showImgRect( this.group, "starPointWindGame.png", -15, -46, 23, 23 );
		this.star2 = Handler.showImgRect( this.group, "starPointWindGame.png", -15, -27, 23, 23 );
		this.star1 = Handler.showImgRect( this.group, "starPointWindGame.png", -15, -6, 23, 23 );
		
		let textnumPointStarParams1 = {
			fontWeight: 'bold',
			fontSize: 14,
			parent: this.group,
			text : "- "+Math.floor(pointsFor1Star*1.4),
			x : 0,
			y : -55
		};
		let textnumPointStarParams2 = {
			fontWeight: 'bold',
			fontSize: 14,
			parent: this.group,
			text : "- "+Math.floor(pointsFor1Star*1.2),
			x : 0,
			y : -36
		};
		let textnumPointStarParams3 = {
			fontWeight: 'bold',
			fontSize: 14,
			parent: this.group,
			text : "- "+pointsFor1Star,
			x : 0,
			y : -15
		};

		Handler.newText( textnumPointStarParams1 );
		Handler.newText( textnumPointStarParams2 );
		Handler.newText( textnumPointStarParams3 );
		this.countPoints = 0;
		return this;
    };  
	
    PointsPanel.showNumber = function(  ) {
		if ( this.gNumPoints ) Handler.destroy( this.gNumPoints );

        this.gNumPoints = Handler.newGroup( this.group );         
        Handler.showNumber( "o", this.back.x+20, this.back.y+40, this.countPoints, 17, 23, this.gNumPoints, '', 2 );
        this.gNumPoints.x = -Math.floor( this.gNumPoints.width/2 );
		
		return this;
	};
