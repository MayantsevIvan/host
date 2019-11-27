	
	"use strict";
	
	let TaskBeforeLevel = {};

	TaskBeforeLevel.show = function( parent, numLevel ){
		this.group = Handler.newGroup( parent );
		this.gt = GameTypes.info[numLevel];
		let numberTask = [];
		let countTasksGems = [];
		if ( this.gt['sc'] ) { numberTask[0] = this.gt['sc']*100 };
		
		for( let i = 1; i <= 9; i++ ){
			if ( i > 0 && i <= 5 ){
				if ( isMobile) {
					countTasksGems[i-1] = Handler.mobileTask[i] == (null) ? 0 : Handler.mobileTask[i];
				} else {
					countTasksGems[i-1] = this.gt['g'+i] == ( null ) ? 0 : this.gt['g'+i];
				};
				numberTask[1] = countTasksGems;
			};
			if ( this.gt['g'+i] != 0 && i == 9 ) numberTask[1][5] = this.gt['g'+i] == null ? 0 : this.gt['g'+i];
			if ( this.gt['g'+i] != 0 && i == 6 ) numberTask[2] = this.gt['g'+i];
			if ( this.gt['g'+i] != 0 && i == 7 ) numberTask[3] = this.gt['g'+i];
		};
		
		
		let yTask = -129;
		
		let objTask = null;
		
		let anim9Gem = function(obj){
			TweenMax.to(obj, 0.700, { alpha:0.5 });
			TweenMax.to(obj, 0.700, { delay:0.5,alpha:1 });
		}
		
		for ( let i = 0; i <= 3; i++ ) {
			let lable = null;
			if ( numberTask[i] !=  null ) {
				yTask += 39;
				Handler.showImgRect(this.group,"markerTask.png",-240,yTask,24,24);
				lable = Handler.showImg(this.group,"lableTask"+(i+1)+".png",-210,yTask);
				if ( !isMobile ) {
					lable.width /= 2;
					lable.height /= 2;
				};
				lable.x += lable.width/2;
				//lable.y += lable.height/2;
			}
			if ( i == 0 && numberTask[i] != null ) {
				let numberTaskImg = Handler.showNumber('ry',-55, yTask,numberTask[i],19,24, this.group,'',2);
				numberTaskImg.x -= Math.floor( numberTaskImg.width/2 );
			} else {
				if ( i == 1 && numberTask[i] != null ) {
					let xObjTask = 5;
					for ( let  j = 0; j <= 5; j++ ) {
						if ( numberTask[1][j] != 0) {
							let objTaskGr = Handler.newGroup();
							this.group.addChild(objTaskGr);
							Handler.showImgRect(objTaskGr,"backgrObjTask.png",xObjTask,yTask,45,35);
							let numGem = j+1;
							if ( j == 5 ) {
								numGem = 4; 
							}
							let objTask = Handler.showImg(objTaskGr,"objTask"+numGem+".png",xObjTask+18,yTask-1);
							if ( !isMobile ) {
								objTask.width /= 2;
								objTask.height /= 2;
							};
							let numObjTaskImg = Handler.showNumber('by', xObjTask-1, yTask-2,numberTask[1][j],13,16, objTaskGr,'',2);
							numObjTaskImg.x -= Math.floor( numObjTaskImg.width/2 );
							if ( j == 5 ) {
								setInterval(anim9Gem,1400,objTask); 
							}
							xObjTask = xObjTask + objTaskGr.width+5;
						}
					}
				} else { 
					if ( i == 2 && numberTask[i] != null ) {
						let backgrGlass = Handler.showRoundedRect( this.group, 150, yTask-20, 40, 40, 0xb04000, 5 ,2,0xffffcc);
						//backgrGlass.lineStyle(25,0); 
						//backgrGlass.updateTransform(); 
						Handler.showImgRect(this.group,"objTask6.png",170,yTask,30,30);
					} else { 
						if ( i == 3 && numberTask[i] != null ) {
							Handler.showImgRect(this.group,"objTask7.png",120,yTask,35,35);	
						}
					}
				}
			}
		};
	};