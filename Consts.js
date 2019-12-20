	let Consts = {};
	//Директории//
	let baseDir = isMobile ? "imagesTinyHalf" : "imagesTiny";
	Consts.DIR_IMG_BEFORE_LEVEL              = baseDir + "/winds/beforeLevel/";
	Consts.DIR_END_LEVEL                     = baseDir + "/winds/endLevel/";
	Consts.DIR_PUZZLE                        = baseDir + "/winds/puzzle/";
	Consts.DIR_BUY_BOOSTER                   = baseDir + "/winds/buyBooster/";
	Consts.DIR_BUY_LIVES                     = baseDir + "/winds/buyLives/";
	Consts.DIR_BUY_COINS                     = baseDir + "/winds/buyCoins/";
	Consts.DIR_NUMBERS                       = baseDir + "/fonts/";
	Consts.DIR_MY_SCORE                      = baseDir + "/winds/myScore/";
	Consts.DIR_IMG_BOT_PANEL                 = baseDir + "/winds/botomPanel/";
	Consts.DIR_STEPS_LEFT                    = baseDir + "/winds/stepsLeft/";
	Consts.DIR_MSG                           = baseDir + "/winds/message/";
	Consts.DIR_GAME                          = baseDir + "/winds/game/";
	Consts.DIR_DAILY_BONUS                   = baseDir + "/winds/dailyBonus/";
	Consts.WIND_SMALL_ACT_INV                = baseDir + "/winds/acInvInGame/";
	Consts.DIR_MENU_LEVELS                   = baseDir + "/winds/menuLevels/";
	Consts.DIR_AC4                           = baseDir + "/winds/ac4/";
	Consts.DIR_AC5STEPS                      = baseDir + "/winds/ac5Steps/";
	Consts.DIR_AC_INV_GAME                   = baseDir + "/winds/acInvInGame/";
	Consts.DIR_AC_SALE1                      = baseDir + "/winds/acSale1/";
	Consts.DIR_ACTION0                       = baseDir + "/winds/acSale/";
	Consts.DIR_AC_INV_TO_GAME                = baseDir + "/winds/acInvToGame/";
	Consts.DIR_AC_FRIEDS                     = baseDir + "/winds/acFriends/";
	Consts.DIR_AC_BOOSTER                    = baseDir + "/winds/acBooster/";
	Consts.DIR_WIND_LOADER                   = baseDir + "/winds/windLoader/";
	Consts.DIR_WIND_LOADING                  = baseDir + "/winds/windLoading/";
	Consts.DIR_FULL_SCREEN                   = baseDir + "/winds/fullScreen/";
	Consts.DIR_BACKGROUNDS                   = baseDir + "/backgrounds/";
	Consts.DIR_TUTORIAL                      = baseDir + "/tutorial/";
	Consts.DIR_M                             = baseDir + "/m/";
	//URL//
	Consts.URL_FR_USERS = [
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",
							"https://i.mycdn.me/image?id=166147225784&t=2&plc=API&ts=00&aid=177033216&tkn=*no3Wnvu_xW3Saa95Upb1uuVxIcI",
							"https://i.mycdn.me/image?id=837695512602&t=2&plc=API&ts=00&aid=177033216&tkn=*5_z9E8E8wRDjSN2v43lP9vC4jr0",
							"https://i.mycdn.me/image?id=882130357646&t=2&plc=API&ts=000201009c00&aid=177033216&tkn=*IWJ90bLGg_zH2VP_Sa9EErpD6ug",
							"https://i.mycdn.me/image?id=866504450881&t=2&plc=API&ts=00&aid=177033216&tkn=*zWo2OZE4CY_IwZnFDCBMYEopI_s",
							"https://i.mycdn.me/image?id=283836267855&t=2&plc=API&aid=177033216&tkn=*oIkrU_qjYG2dpo-M9cxD7ToDmiA",
							"https://i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",
							"https://i.mycdn.me/image?id=416856071009&t=2&plc=API&aid=177033216&tkn=*L2aPEkNJbPeHC_arQkMCc2CgzXU",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							"https://i.mycdn.me/image?id=868891975511&t=2&plc=API&ts=00&aid=177033216&tkn=*9LyCC5i48n9B6gXZTxjf_ygcBBs",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",						
							//"https://i.mycdn.me/image?id=639190266882&t=2&plc=API&aid=177033216&tkn=*WG1jrcgWpTrcWtGAAe2XhUDDSVg"
							//"https://i.mycdn.me/image?id=639190266882&t=2&plc=API&aid=177033216&tkn=*WG1jrcgWpTrcWtGAAe2XhUDDSVg"
						  ];
	Consts.URL_ALL_RATING_USERS = [
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",
							"https://i.mycdn.me/image?id=166147225784&t=2&plc=API&ts=00&aid=177033216&tkn=*no3Wnvu_xW3Saa95Upb1uuVxIcI",
							"https://i.mycdn.me/image?id=837695512602&t=2&plc=API&ts=00&aid=177033216&tkn=*5_z9E8E8wRDjSN2v43lP9vC4jr0",
							"https://i.mycdn.me/image?id=882130357646&t=2&plc=API&ts=000201009c00&aid=177033216&tkn=*IWJ90bLGg_zH2VP_Sa9EErpD6ug",
							"https://i.mycdn.me/image?id=866504450881&t=2&plc=API&ts=00&aid=177033216&tkn=*zWo2OZE4CY_IwZnFDCBMYEopI_s",
							"https://i.mycdn.me/image?id=283836267855&t=2&plc=API&aid=177033216&tkn=*oIkrU_qjYG2dpo-M9cxD7ToDmiA",
							"https://i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",
							"https://i.mycdn.me/image?id=416856071009&t=2&plc=API&aid=177033216&tkn=*L2aPEkNJbPeHC_arQkMCc2CgzXU",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							//"https://i.mycdn.me/image?id=868891975511&t=2&plc=API&ts=00&aid=177033216&tkn=*9LyCC5i48n9B6gXZTxjf_ygcBBs",
							//"https://i.mycdn.me/image?id=639190266882&t=2&plc=API&aid=177033216&tkn=*WG1jrcgWpTrcWtGAAe2XhUDDSVg"
						  ];
	Consts.URL_MONEY_RATING_USERS = [
							"https://i.mycdn.me/image?id=885282884146&t=2&plc=API&ts=00&aid=177033216&tkn=*Ige9NtGVTKIF6tmpmpj6eBHpqMM",
							"https://i.mycdn.me/image?id=884793793994&t=2&plc=API&ts=00&aid=177033216&tkn=*9JwAFYk4bGQOssT3sZgpQj8SOpI",
							"https://i.mycdn.me/image?id=854404514914&t=2&plc=API&ts=00&aid=177033216&tkn=*6phzvQ5DlM4wMGykQM5ZE4u4gTQ",
							"https://i.mycdn.me/image?id=882712155339&t=2&plc=API&ts=00020100a400&aid=177033216&tkn=*-VSvP_3GJSWvXpJUmqG0xfl5vvw",
							"https://i.mycdn.me/image?id=166147225784&t=2&plc=API&ts=00&aid=177033216&tkn=*no3Wnvu_xW3Saa95Upb1uuVxIcI",
							"https://i.mycdn.me/image?id=837695512602&t=2&plc=API&ts=00&aid=177033216&tkn=*5_z9E8E8wRDjSN2v43lP9vC4jr0",
							"https://i.mycdn.me/image?id=882130357646&t=2&plc=API&ts=000201009c00&aid=177033216&tkn=*IWJ90bLGg_zH2VP_Sa9EErpD6ug",
							"https://i.mycdn.me/image?id=866504450881&t=2&plc=API&ts=00&aid=177033216&tkn=*zWo2OZE4CY_IwZnFDCBMYEopI_s",
							"https://i.mycdn.me/image?id=283836267855&t=2&plc=API&aid=177033216&tkn=*oIkrU_qjYG2dpo-M9cxD7ToDmiA",
							"https://i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",
							"https://i.mycdn.me/image?id=416856071009&t=2&plc=API&aid=177033216&tkn=*L2aPEkNJbPeHC_arQkMCc2CgzXU",
							"https://i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",
							//"https://i.mycdn.me/image?id=868891975511&t=2&plc=API&ts=00&aid=177033216&tkn=*9LyCC5i48n9B6gXZTxjf_ygcBBs",
							//"https://i.mycdn.me/image?id=639190266882&t=2&plc=API&aid=177033216&tkn=*WG1jrcgWpTrcWtGAAe2XhUDDSVg"
						  ];
	//puzzleAlf
	Consts.ALF = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];
	//timer//
	Consts.TIME_ROT_START = 7900;
	Consts.TIME_ADD_ENERGY = 5;
	Consts.TIME_ROT_LUCH_BUY_BOOSTER = 11000;
	
	Consts.TOP_FRENDS      = 1;
	Consts.TOP_ALL         = 2;
	Consts.TOP_MONEYS      = 3;
	Consts.MY_SCORE        = 4;
	
	Consts.numLives        = 3;
	Consts.coordsWidth    = 50;
	Consts.coordsHeight   = 50;
	Consts.gemsWidth      = 60;
	Consts.gemsHeight     = 60;
	Consts.coordsShiftX = 0;
	Consts.coordsShiftY = 0;

	Consts.TIME_WINDOW_MOVE = 150;
	Consts.WITHOUT_PARENT = 0;
	
	Consts.GLASS_BOX        = 2;    //Consts.
	Consts.GLASS_STONE_BOX  = 3;    //Consts.
	Consts.STONE_COLOR      = 5;    //Consts.
	Consts.COIN_COLOR       = 6;    //Consts.
	Consts.YASCHIK          = 7;    //Consts.
	Consts.GHOST_BOX        = 8;    //Consts.
	Consts.IRON_BOX         = 9;//Consts.
	Consts.TIME_SINGLE_MOVE = 0.15;//Consts.
	Consts.shSelBon = 20;
	//return Consts;
	
	Consts.BONUSES_NAMES = ['bPL','bMX','bMT'];
//	Consts.BVLINE	 = 1;
//	Consts.BGLINE	 = 2;
	Consts.BPLINE	 = 'bPL';
	Consts.BMOLOTOK  = 'bMT';
//	Consts.BMIX      = 5;
	Consts.BVGLINE	 = 'bMX';
	
	Consts.NETWORK_DV 	= "DEV";
	Consts.NETWORK_OK = "ok";