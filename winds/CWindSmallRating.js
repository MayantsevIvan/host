	
	"use strict";
	
	let CWindSmallRating = {};
	
	CWindSmallRating.showUserCard = function( loader, resource, x, y, url, numberUser, numberPoints, nameUser ) {
		let userCardGroup    = Handler.newGroup();
		let userPhotoGroup   = Handler.newGroup();
		let userNumberGroup  = Handler.newGroup();
		let userPointsGroup  = Handler.newGroup();
		let userNameGroup    = Handler.newGroup();
		
		Handler.showImgRect(userCardGroup,"backgrUserCard.png",0,0,250,152);
		let backgroundImgUser = Handler.showImgRect(userCardGroup,"backgrUsers.png",-65,-24,81,81);
		
		let imgUsrX = Math.floor( backgroundImgUser.x  )  ;
		let imgUsrY = Math.floor(  backgroundImgUser.y );
		let imgUsr = Handler.showImg( userCardGroup, resource['ui'+numberUser].url, imgUsrX, imgUsrY );
		Handler.setMaskOnPhoto( userCardGroup, imgUsr, backgroundImgUser.width, backgroundImgUser.height );

//		let numberUserImg = new CImgTextField(userNumberGroup, numberUser ,"wr", -95, -60);
//		numberUserImg.showText();
		let numberUserImg = Handler.showNumber('wr',-95,-60,numberUser,19,25,userNumberGroup,'',0);
		numberUserImg.x -= Math.floor( numberUserImg.width/2 );
		let star = Handler.showImgRect(userPointsGroup,"starPoints.png",15,-24,64,61);
		let textParamsNumber = {
			fontFamily: 'Arial',
			fontSize: 24,
			fontWeight: 'bold',
			color: '#b04000',
			stroke: '#FFFFFF',
			lineJoin: 'round',
			strokeThickness: 3,
			parent: userPointsGroup,
			text: numberPoints+"",
			x: star.x, 
			y: star.y+4,
			anchorCenter: true
		};
		
		let textParamsName = {
			fontFamily: 'Arial',
			fontSize: 24,
			fontWeight: 'bold',
			color: '#b04000',
			stroke: '#FFFFFF',
			lineJoin: 'round',
			strokeThickness: 3,
			parent: userNameGroup,
			text: nameUser,
			x: -35, 
			y: 27,
			anchorCenter: true
		};
		
		Handler.newText( textParamsNumber );
		
		Handler.newText( textParamsName );

	
		let butGivGift  = Handler.showImgRect(userCardGroup,"butGivGift.png",-35,55,167,33);
		
		userCardGroup.addChild( userPhotoGroup  );
		userCardGroup.addChild( userNumberGroup );
		userCardGroup.addChild( userPointsGroup );
		userCardGroup.addChild( userNameGroup   );
		userCardGroup.x = x;
		userCardGroup.y = y;
		return userCardGroup;	
	}
	
	CWindSmallRating.showWindRating = function() {
		let self = this;
		let loader = new PIXI.Loader();
		Handler.visibleRt = true;
		let windRGroup = Handler.newGroup();
		windRGroup.interactive = true;
		windRGroup.sortableChildren = true;
		Handler.showImgRect(windRGroup,"backgrWindR.png",0,0,300,578);
		if ( isMobile ) {
			let touchCross = function() {
				windRGroup.removeSelf();
				Handler.visibleRt = false;
			}
			let cross = Handler.showImgRect(windRGroup,"cross.png",32,-285,36,36);
			cross.onEL('pointertap',touchCross);
		}
		let arrowUp = Handler.showImgRect(windRGroup,"arrowUp.png",-35,-278,44,26);
		let arrowDown = Handler.showImgRect(windRGroup,"arrowDown.png",-35,208,44,26);
		
		if ( isMobile ) {
			arrowUp.x   = 0;
			arrowUp.y   = 208;
			arrowDown.x = -70;
		}
		
		let users_fr = [];
		let url;
		let name;
		let place;
		let points;
		
		let addUser = function( fusers, furl, fname, fplace, fpoints ){ 
			fusers[ fusers.length ] = [
				url    = furl,
				name   = fname,
				place  = fplace,
				points = fpoints,
			];
		}
		
		let optionsAssets = {
			loadType: 2
		};
		for ( let i = 1; i <= Consts.URL_FR_USERS.length-1; i++ ) {
			addUser( users_fr, Consts.URL_FR_USERS[i], "Соломон"+i, i, i*5 );
			loader.add( "ui"+i, url, optionsAssets );
		}
	
		let rating = Handler.newGroup( windRGroup );
		let showManyCard = function( loader, resource, numStartUsr,fusers) {
			let lastUser = numStartUsr + 2;
			let xCor1Card = -5;
			let yCor1Card = -190;
			for ( let i = numStartUsr; i <= lastUser; i++ ) {
				if ( fusers[i] != null && fusers[i][0] != null ) {
					let userCard = CWindSmallRating.showUserCard( loader, resource, xCor1Card,yCor1Card,fusers[i][0],fusers[i][2],fusers[i][3],fusers[i][1]);
					rating.addChild(userCard);
					yCor1Card = yCor1Card + 155;
				}
			}
		}
		
		let onLoadResources = null;
		let onAssetsLoaded = function ( loader, resources )
		{
			onLoadResources = resources;
			showManyCard( loader, resources, 0, users_fr ); 
		};
		loader.load( onAssetsLoaded );

		let shiftUserRating = 0;
		let onButUp = function(evt){
			if ( shiftUserRating > 0 ){
				Handler.removeGroupChilds( rating );
				shiftUserRating = shiftUserRating - 1;
				showManyCard( loader, onLoadResources, shiftUserRating, users_fr );
				return true;
			}
		}
		
		let onButDown= function(evt){
			if( shiftUserRating < users_fr.length-3 ){
				Handler.removeGroupChilds( rating );
				shiftUserRating = shiftUserRating + 1;
				showManyCard( loader, onLoadResources, shiftUserRating, users_fr );
				return true;
			}
		}
		
		arrowUp.interactive = true;
		arrowUp.buttonMode = true;
		arrowDown.interactive = true;
		arrowDown.buttonMode = true;
		arrowUp  .on("pointerdown", onButUp);
		arrowDown.on("pointerdown", onButDown);
		
		let butInviteFr = Handler.showImgRect(windRGroup,"butInviteFr.png",-35,245,149,46);
		
		return windRGroup;
	};