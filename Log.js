
    let Log = {};         

    Log.init = function() {
		window.onbeforeunload = function(e) {
		    BackClient.send( BackClient.LOG_ADD, { action : 'gameClose' } );
        };
	};
	
	Log.add = function( action, numLevel, errorData ) {
		let params = {};
		params.action = action;
		params.numLevel = numLevel;
		params.errorData = JSON.stringify( errorData );
		BackClient.send( BackClient.LOG_ADD, params );
	};
        
	Log.onErrorCatched = function( error ) {
		Log.add( 'error', null, error.message + " " + error.stack );
	}		
