console.log("Poki wrapper load");
///~
function poki_init_raw() {
    console.log("Poki wrapper init");
    // fix GMS1 bug with iframes
    var ctr = document.getElementById("gm4html5_div_id");
    if (ctr && !ctr.frames) ctr.frames = [];
    return 0;
}
///~
function poki_script_closure_raw(self, other, script, custom) {
    return function(result) {
        window.gml_Script_gmcallback_poki_closure(self, other, script, result, custom)
    }
}

function poki_level_start_event(level) {
	if (window.PokiSDK) PokiSDK.customEvent('game', 'segment', { label: 'level', value: level });
	console.log(level);
}

function poki_is_blocked() {
    return !window.PokiSDK_OK;
}

function poki_game_loading_finished() {
	if (window.PokiSDK) PokiSDK.gameLoadingFinished();
}

function poki_gameplay_start() {
    if (window.PokiSDK) PokiSDK.gameplayStart();
}

function poki_gameplay_stop() {
    if (window.PokiSDK) PokiSDK.gameplayStop();
}

function poki_happy_time(magnitude) {
    if (window.PokiSDK) PokiSDK.happyTime(magnitude);
}

function poki_is_inspector(){
	return document.referrer == 'https://inspector.poki.dev/';
}

///~
function poki_commercial_break_raw(fn) {
    if (window.PokiSDK) {
        PokiSDK.commercialBreak().then(function() { fn(true); });
    } else setTimeout(function() { fn(false); }, 0);
}

///~
function poki_rewarded_break_raw(fn) {
    if (window.PokiSDK) {
        PokiSDK.rewardedBreak().then(function() { fn(true); });
    } else setTimeout(function() { fn(false); }, 0);
}

function close_fun_loader(){
	if(document.getElementById("car_fun_loader") != null){
		cancel_bar_loader_animation();
	}
}

function empty_bar(ctx, width, height, total, current, image) {
}
/// https://yal.cc/gamemaker-html5-loading-bar-extended/
//var inst = { };
///~
function poki_loadbar(ctx, width, height, total, current, image) {
    
	if (window.PokiSDK) { // if you have your own loadbar, just copy this block in there
        if (window.PokiSDK_loadState == 0) {
            window.PokiSDK_loadState = 1;
            PokiSDK.gameLoadingStart();
        }
        PokiSDK.gameLoadingProgress({ percentageDone: current/total });
        if (current >= total && window.PokiSDK_loadState != 2) {
		  window.PokiSDK_loadState = 2;
		}
    }
    
	/*const barwidth = (width / 100) * 50;				// Loading bar 80% width of screen
	const barheight = 2;                              // Loading bar only 4 pixels high
	const x = (width - barwidth) / 2;
	const y = 10 + (height - barheight) / 2;

	ctx.fillStyle = "#151515";
	ctx.fillRect(0, 0, width, height);

	if (current != 0){
		const w = (barwidth / total) * current;

		// Dar gray bar
		ctx.fillStyle = "#404040";
		ctx.fillRect(x, y, barwidth, barheight);

		ctx.fillStyle = "#8d8f90";
		ctx.fillRect(x, y, w, barheight);
	}*/
}