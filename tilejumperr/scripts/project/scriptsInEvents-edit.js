import * as CONFIG_DATA from "./config.js";
import * as BEATMAP_DATA from "./beatmap-data.js";
import * as crazy from "./crazy.js";


const scriptsInEvents = {

	async Gamesheet_Event30_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStart();
	},

	async Gamesheet_Event161_Act5(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event161_Act6(runtime, localVars)
	{
		window.CrazyGames.SDK.game.happytime();
	},

	async Gamesheet_Event173(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16);
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16);
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16);
	},

	async Gamesheet_Event176(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16) - localVars.vDarkness;
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16) - localVars.vDarkness;
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16) - localVars.vDarkness;
	},

	async Gamesheet_Event179(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16) + localVars.vLightness;
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16) + localVars.vLightness;
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16) + localVars.vLightness;
	},

	async Gamesheet_Event243_Act5(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event244_Act4(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event246_Act4(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStart();
	},

	async Gamesheet_Event273_Act5(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event274_Act4(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event278_Act4(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStop();
	},

	async Gamesheet_Event281_Act3(runtime, localVars)
	{
		window.ConstructCrazySDK.data.setItem(runtime.globalVars.LS_KEY,
		runtime.globalVars.LS_KEY_Data);
	},

	async Loadersheet_Event2_Act1(runtime, localVars)
	{
		runtime.objects.JSON_Config.getFirstInstance().setJsonString(JSON.stringify(CONFIG_DATA.config));
		runtime.objects.JSON_Beatmap.getFirstInstance().setJsonString(JSON.stringify(BEATMAP_DATA.beatmapData));
	},

	async Loadersheet_Event2_Act2(runtime, localVars)
	{
		
		const sdkElem = document.createElement("script");
		sdkElem.type = "text/javascript";
		sdkElem.src = "Construct3CrazySDK-v3-edit.js";
		document.body.appendChild(sdkElem);
		sdkElem.onload = function () {
		    window.ConstructCrazySDK.init()
		  .then(() => {
			runtime.globalVars.CrazyLoaded = 1;
		 })
		 .catch((e) => console.log("Failed to init CrazySDK", e));
		};
		sdkElem.onerror = function () {
		    console.error("Failed to load Construct3CrazySDK script.");
		};
	},

	async Loadersheet_Event8_Act12(runtime, localVars)
	{
		window.ConstructCrazySDK.data.setItem(runtime.globalVars.LS_KEY,
		runtime.globalVars.LS_KEY_Data);
	},

	async Loadersheet_Event13_Act2(runtime, localVars)
	{
		window.CrazyGames.SDK.game.loadingStop();
	},

	async Loadersheet_Event14_Act6(runtime, localVars)
	{
		window.ConstructCrazySDK.data.setItem(runtime.globalVars.LS_KEY,
		runtime.globalVars.LS_KEY_Data);
	},

	async Loadersheet_Event16_Act1(runtime, localVars)
	{
		var DKey = window.ConstructCrazySDK.data.getItem(runtime.globalVars.LS_KEY);

		if(DKey != null){
		runtime.globalVars.LS_KEY_Data = DKey;
		runtime.callFunction("GetData");
		}

		else{
		runtime.callFunction("SetFirstData");
		}
		
	},

	async Loadersheet_Event18_Act2(runtime, localVars)
	{
		window.CrazyGames.SDK.game.loadingStart();
	},

	async Homesheet_Event2_Act1(runtime, localVars)
	{
		crazy.addAuthListener();
	},

	async Homesheet_Event67_Act1(runtime, localVars)
	{
		crazy.getUser();
	},

	async Homesheet_Event73_Act1(runtime, localVars)
	{
		crazy.showAuthPrompt();
	},

	async Generalsheet_Event4_Act1(runtime, localVars)
	{
		runtime.globalVars.HasAdblocker = await window.ConstructCrazySDK.ad.hasAdblock();
	},

	async Generalsheet_Event116_Act3(runtime, localVars)
	{
		const callbacks = {
		  adFinished: () => c3_callFunction("MidGameAdEnd"),
		  adError: (error) => c3_callFunction("MidGameAdEnd"),
		  
		};
		window.CrazyGames.SDK.ad.requestAd("midgame", callbacks);
	},

	async Generalsheet_Event126_Act3(runtime, localVars)
	{
		const callbacks = {
			adFinished: () => c3_callFunction("GetReward"),
		adError: (error) => c3_callFunction("RewardedAdFailed" , [error]),
		};
		
		window.CrazyGames.SDK.ad.requestAd("rewarded", callbacks);
	},

	async Generalsheet_Event151_Act1(runtime, localVars)
	{
		window.CrazyGames.SDK.game.gameplayStart();
	},

	async Generalsheet_Event179_Act2(runtime, localVars)
	{
		window.ConstructCrazySDK.data.setItem(runtime.globalVars.LS_KEY,
		runtime.globalVars.LS_KEY_Data);
	},

	async Levelcreatorsheet_Event3_Act2(runtime, localVars)
	{
		var textArea = document.getElementById("TextStyle");
		textArea.scrollTop = textArea.scrollHeight;
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

