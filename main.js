
	
	
	let Winds = null;
	try {
		Winds = CWinds.newObject();
		let onAssetsLoaded = function() {
			try {
				let authKey = "";
				User.viewer_id = "550923363671";
				BackClient.init( { auth_key: authKey } );
				Handler.canvas    = Handler.newGroup();
				Handler.head      = Handler.newGroup();
				Handler.gWinds    = Handler.newGroup();
				Handler.gLoading  = Handler.newGroup();
				let onAuthCallback = function( response ) {
					try {
						if ( Winds.getTopWindName() == Winds.WIND_LOADER ) {
							Winds.shutdownTopWind(1);
						}
						User.init( response );//User must inited before Winds.WIND_MENU_LEVELS
						Winds.show( Winds.WIND_MENU_LEVELS );
						Head.init( response );
						if (parseInt(response['db'])>0) Winds.show( Winds.WIND_DAILY_BONUS, { num_day: parseInt(response.num_day) } );			
					} catch (ex) {
						Handler.onErrorCatched(ex);
					}
				};
				BackClient.ask( BackClient.AUTH, onAuthCallback );
			} catch (ex) {
		        Handler.onErrorCatched(ex);
	        }
		}
		Winds.show( Winds.WIND_LOADER, { onAssetsLoaded: onAssetsLoaded } );
	} catch (ex) {
		Handler.onErrorCatched(ex);
	}


	
	