	"use strict";
	
    let StepsPanel = {};
   
    StepsPanel.init = function( parentGroup, countSteps ) {
		Handler.destroy( this.group );

	    this.group = Handler.newGroup( parentGroup );
		this.countSteps = countSteps;
 		this.back = Handler.showImgRect( this.group, "panelStepsWindGame.png", -315,-112,116,52 ); 
		
		this.group.x = isMobile ? 190 : -315;
		this.group.y = isMobile ? 437 : -112;

		
		
        this.showNumber();
		return this;
    };    
	
    StepsPanel.showNumber = function( countSteps ) {
	    this.countSteps = countSteps || this.countSteps;
		Handler.destroy( this.gNumSteps );

        this.gNumSteps = Handler.newGroup( this.group );         
        Handler.showNumber( "o", this.back.x+30, this.back.y+3, this.countSteps, 17, 23, this.gNumSteps, '', 2 );
		this.gNumSteps.x = -Math.floor( this.gNumSteps.width/2 );
		
		return this;
	};