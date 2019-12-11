	
	let Config = {};
	
	Config.crypt = false;
	
	Config.NETWORK  = Consts.NETWORK_OK;
	Config.NETWORK  = "ok";
	Config.BASE_URL	= "https://probel.su/jlines/";
	Config.BACKEND_API_URL = Config.BASE_URL + 'api.php';
	Config.OK_API_ID  = "1095348480";
	Config.OK_API_KEY = "CBACLKECEBABABABA";
	//Config.PUZZLE_URL = "https://tidings.su/gems_ok/www/puzzles";
	let baseUrl = isMobile ? "imagesTinyHalf" : "imagesTiny";
	Config.PUZZLE_URL = baseUrl + "/puzzles/";
//	Config.NETWORK = Consts.NETWORK_DV;