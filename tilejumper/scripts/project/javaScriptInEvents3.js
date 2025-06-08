import * as CONFIG_DATA from "./config.js";
import * as BEATMAP_DATA from "./beatmap-data.js";

const scriptsInEvents = {

	async Loadersheet_Event2_Act1(runtime, localVars)
	{
		runtime.objects.JSON_Config.getFirstInstance().setJsonString(JSON.stringify(CONFIG_DATA.config));
		runtime.objects.JSON_Beatmap.getFirstInstance().setJsonString(JSON.stringify(BEATMAP_DATA.beatmapData));
	},

	async Loadersheet_Event2_Act3(runtime, localVars)
	{
		window.addEventListener("wheel", (event) => event.preventDefault(), {
		    passive: false,
		});
		
		window.addEventListener("keydown", (event) => {
		    if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
		        event.preventDefault();
		    }
		});
	},

	async Loadersheet_Event2_Act4(runtime, localVars)
	{
		
	},

	async Loadersheet_Event2_Act6(runtime, localVars)
	{

	},

	async Loadersheet_Event2_Act7(runtime, localVars)
	{

	},

	async Loadersheet_Event5_Act7(runtime, localVars)
	{

	},

	async Loadersheet_Event8_Act12(runtime, localVars)
	{
		
	},

	async Loadersheet_Event16_Act3(runtime, localVars)
	{
	},

	async Loadersheet_Event17_Act5(runtime, localVars)
	{
	},

	async Loadersheet_Event19_Act1(runtime, localVars)
	{
		
		
		
	},

	async Loadersheet_Event19_Act2(runtime, localVars)
	{

	},

	async Loadersheet_Event21_Act2(runtime, localVars)
	{
	},

	async Gamesheet_Event23(runtime, localVars)
	{
		function isMobile() {
		  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		}
		if (isMobile()) {
			runtime.objects.TutKey_A.getFirstInstance().isVisible = false;
			runtime.objects.TutKey_D.getFirstInstance().isVisible = false;
		}
	},

	async Gamesheet_Event32_Act1(runtime, localVars)
	{
	},

	async Gamesheet_Event171_Act6(runtime, localVars)
	{
	},

	async Gamesheet_Event171_Act7(runtime, localVars)
	{
	},

	async Gamesheet_Event183(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16);
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16);
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16);
	},

	async Gamesheet_Event186(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16) - localVars.vDarkness;
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16) - localVars.vDarkness;
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16) - localVars.vDarkness;
	},

	async Gamesheet_Event189(runtime, localVars)
	{
		localVars.HEXColor = localVars.HEXColor.replace('#', '');
		localVars.R = parseInt(localVars.HEXColor.substring(0, 2), 16) + localVars.vLightness;
		localVars.G = parseInt(localVars.HEXColor.substring(2, 4), 16) + localVars.vLightness;
		localVars.B = parseInt(localVars.HEXColor.substring(4, 6), 16) + localVars.vLightness;
	},

	async Gamesheet_Event257_Act5(runtime, localVars)
	{
	},

	async Gamesheet_Event258_Act4(runtime, localVars)
	{
	},

	async Gamesheet_Event263_Act1(runtime, localVars)
	{
	},

	async Gamesheet_Event290_Act5(runtime, localVars)
	{
	},

	async Gamesheet_Event291_Act4(runtime, localVars)
	{
	},

	async Gamesheet_Event294_Act1(runtime, localVars)
	{
	},

	async Gamesheet_Event307_Act4(runtime, localVars)
	{
	},

	async Gamesheet_Event310_Act3(runtime, localVars)
	{
		
	},

	async Homesheet_Event2_Act1(runtime, localVars)
	{
	},

	async Homesheet_Event4_Act6(runtime, localVars)
	{

	},

	async Homesheet_Event83(runtime, localVars)
	{
	},

	async Homesheet_Event85(runtime, localVars)
	{
	},

	async Homesheet_Event88(runtime, localVars)
	{
	},

	async Homesheet_Event90(runtime, localVars)
	{
	},

	async Homesheet_Event105_Act1(runtime, localVars)
	{
	},

	async Homesheet_Event111_Act1(runtime, localVars)
	{
	},

	async Levelcreatorsheet_Event3_Act2(runtime, localVars)
	{
		var textArea = document.getElementById("TextStyle");
		textArea.scrollTop = textArea.scrollHeight;
	},

	async Generalsheet_Event4_Act1(runtime, localVars)
	{
	},

	async Generalsheet_Event118_Act3(runtime, localVars)
	{
		
	},

	async Generalsheet_Event128_Act3(runtime, localVars)
	{
		
	},

	async Generalsheet_Event153_Act1(runtime, localVars)
	{
	},

	async Generalsheet_Event182_Act2(runtime, localVars)
	{
		
	},

	async Generalsheet_Event207_Act1(runtime, localVars)
	{

	},

	async Generalsheet_Event209_Act1(runtime, localVars)
	{

	},

	async Generalsheet_Event213_Act2(runtime, localVars)
	{

	},

	async Generalsheet_Event215_Act1(runtime, localVars)
	{

	},

	async Generalsheet_Event216_Act1(runtime, localVars)
	{

	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
