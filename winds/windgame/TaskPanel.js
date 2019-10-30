	
	"use strict";
	
	let TaskPanel = {};
	
	TaskPanel.init = function( parentGroup ){
		try {
			//нужно написать от уровня в хете gameObjType;
			this.parent = parentGroup;
			this.group = Handler.newGroup( this.parent );
			this.numLevel = Math.floor( Head.levelName.substr(1) );
			this.gt = GameTypes.info[this.numLevel];
			this.countTasks = [];
			this.countVisibleTask = 0;
			this.currentCountTask = [null,0,0,0,0,0,0,0,0,0];
			//заполнение массива зааний.
			for( let i = 9; i >= 1; --i ){
				if ( this.gt['g'+i] ) {
					this.countTasks[i] = this.gt['g'+i];
					this.countVisibleTask++;
				} else {
					this.countTasks[i] = 0;
				};
			};
			
			this.backgrTasks = Handler.showImg( this.group, "panelTasks"+this.countVisibleTask+"WindGame.png",-322,-75);
			this.backgrTasks.width = this.backgrTasks.width/2;
			this.backgrTasks.height = this.backgrTasks.height/2;
			this.backgrTasks.anchor.set ( 0.5, 0 );
			this.groupsTasks = [];
			let yObjTask = -47;
			if ( this.countVisibleTask > 5 ) yObjTask = -50;
			for( let i = 1; i < this.countTasks.length; i++ ){
				if( this.countTasks[i] != 0 ) {
					this.groupsTasks[i] = Handler.newGroup( this.group );
					Handler.showImgRect( this.groupsTasks[i], "taskBackgrWindGame.png", -325, yObjTask,65,36);
					let k = i == 9 ? 5 : 0;
					let imgObjTask = Handler.showImg(this.groupsTasks[i], "objTask"+ (i-k) +"WindGame.png", -295, yObjTask-1);
					if ( i == 9 ){
						TweenMax.to( imgObjTask, 0.7, { alpha: 0.5, yoyo: true, repeat: -1, ease: Power0.easeNone });
					};
					imgObjTask.width = imgObjTask.width/2;
					imgObjTask.height = imgObjTask.height/2;
					//кол-во заданий
					
					this.groupsTasks[i].sl = Handler.showImgRect( this.groupsTasks[i], 'bySl.png', -332, yObjTask-2, 8, 16 );
					this.groupsTasks[i].taskNum = Handler.showNumber( "by", this.groupsTasks[i].sl.x+7, yObjTask-2, this.countTasks[i], 13, 16, this.groupsTasks[i], '', 5 );
					this.showNumber( i, 0 );
					
					this.groupsTasks[i].galka = Handler.showImgRect( this.groupsTasks[i], 'markerWindGame.png', -330, yObjTask-2, 39, 31 );
					this.groupsTasks[i].galka.isVisible = false; 
					
					yObjTask += this.groupsTasks[i].height+3;
				} else {
					this.groupsTasks[i] = null;
				};            
			};
			return this;
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	TaskPanel.showNumber = function( numTask, count ) {
		this.currentCountTask[numTask] = count;
		if ( this.groupsTasks[numTask].currentCountTask ) {
			this.groupsTasks[numTask].currentCountTask.destroy();
		};
		this.groupsTasks[numTask].currentCountTask = Handler.showNumber( "by", 0,0, this.currentCountTask[numTask], 13, 16, this.groupsTasks[numTask], '', 5 );
		let img = this.groupsTasks[numTask].currentCountTask;
		img.translate( this.groupsTasks[numTask].sl.x - img.width + 6, this.groupsTasks[numTask].sl.y );
		return this;
	};
	
	TaskPanel.refrashGems = function( num, count=1 ) {
		try {
			if ( !num && num < 0 || num > 9 ) return;
			if ( parseInt(this.gt['g'+num]) == 0 ) return;		
			if ( this.countTasks[num] != 0) {
				this.currentCountTask[num] += count;//1
				this.showNumber( num, this.currentCountTask[num] );
				if ( this.currentCountTask[num] >= this.countTasks[num] ) {
					this.groupsTasks[ num ].sl.isVisible = false;
					this.groupsTasks[num].currentCountTask.isVisible = false;
					this.groupsTasks[num].taskNum.isVisible = false;
					this.groupsTasks[num].galka.isVisible = true;
				};
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};