// Minimal runtime + optional ad/rotation logic

// === SETUP DEFAULT CONFIG ===
var gameConfig = {
	gameId: "local-debug",
	debugMode: false,
	AdsWaitForInput: false,
	gameIsPortrait: false,
	activeRotator: false
};

if (typeof gameConfig.AdsWaitForInput === "undefined") gameConfig.AdsWaitForInput = true;

// === HANDLE VISIBILITY ===
function onVisibilityChanged() {
	if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
		if (typeof cr_setSuspended !== "undefined") cr_setSuspended(true);
	else
		if (typeof cr_setSuspended !== "undefined") cr_setSuspended(false);
};

document.addEventListener("visibilitychange", onVisibilityChanged, false);
document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
document.addEventListener("msvisibilitychange", onVisibilityChanged, false);

// === ROTATOR SUPPORT (optional) ===
var onMobile = /mobile|android|iphone|ipad|blackberry|windows phone/i.test(navigator.userAgent);
var reallyOnMobile = onMobile;

function checkOrientation() {
	if (!gameConfig.activeRotator || !reallyOnMobile) {
		hideRotator();
		return true;
	}
	if (gameConfig.gameIsPortrait && $(window).width() > $(window).height()) {
		displayRotator('portrait');
		return false;
	}
	if (!gameConfig.gameIsPortrait && $(window).width() < $(window).height()) {
		displayRotator('landscape');
		return false;
	}
	hideRotator();
	return true;
}

function displayRotator(orientation) {
	var gameElement = document.getElementById("c2canvasdiv");
	var rotatorElement = document.getElementById("rotator");
	if (rotatorElement.style.display != "none") return false;
	if (typeof cr_setSuspended === "function") cr_setSuspended(true);
	gameElement.style.display = "none";
	rotatorElement.innerHTML = '<img id="rotatorLogo" src="./rotate-device-to-' + orientation + '.jpg" />';
	rotatorElement.style.display = "block";
	rotatorElement.style.backgroundColor = "black";
	rotatorElement.style.width = "100%";
	rotatorElement.style.height = "100%";
	window.centerRotatorTimer = setInterval(centerRotator, 100);
	return true;
}

function centerRotator() {
	var rotatorElement = document.getElementById("rotator");
	rotatorElement.style.paddingLeft = $(window).width() / 2 - $("#rotatorLogo").width() / 2 + "px";
	rotatorElement.style.paddingTop = $(window).height() / 2 - $("#rotatorLogo").height() / 2 + "px";
	rotatorElement.style.paddingBottom = $(window).height() / 2 - $("#rotatorLogo").height() / 2 + "px";
}

function hideRotator() {
	var gameElement = document.getElementById("c2canvasdiv");
	var rotatorElement = document.getElementById("rotator");
	if (!rotatorElement || rotatorElement.style.display == "none") return false;
	rotatorElement.innerHTML = "";
	rotatorElement.style.display = "none";
	gameElement.style.display = "block";
	if (typeof cr_setSuspended === "function") cr_setSuspended(false);
	clearInterval(window.centerRotatorTimer);
	return true;
}

var waitForJQ = setInterval(function () {
	if (typeof jQuery === "undefined") return;
	jQuery(document).ready(function () {
		if (checkOrientation() || !gameConfig.activeRotator) hideRotator();
		if (gameConfig.activeRotator && reallyOnMobile) {
			jQuery(window).resize(function () {
				if (checkOrientation()) hideRotator();
			});
		}
	});
	clearInterval(waitForJQ);
}, 100);

window.gdsdk = {
	showBanner: function () {},
	showAd: function () {}
};

function loadGame() {
	if (typeof cr_createRuntime === "function") {
		cr_createRuntime("c2canvas");
	} else {
		setTimeout(loadGame, 500);
	}
}

jQuery(document).ready(function () {
	loadGame();
});
