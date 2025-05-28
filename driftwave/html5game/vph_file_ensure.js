///
function file_ensure_js(path, content) {
	try {
		if (localStorage.getItem(path) == null) {
			localStorage.setItem(path, content);
			return 1;
		} else return 0;
	} catch(err){
		return 0;
	}
}

function file_exists_local_js(path){
	try {
		if (localStorage.getItem(path) == null) {
			return 0;
		} else return 1;
	} catch(err){
		return 0;
	}
}

function browser_get_device_pixel_ratio() {
    return window.devicePixelRatio || 1;
}

function browser_stretch_canvas_ext(canvas_id, w, h) {
	const ratio = window.devicePixelRatio || 1;
    var el = document.getElementById(canvas_id);
    //el.style.width = w + "px";
   // el.style.height = h + "px";
	el.style.transform = `translate(-50%, -50%) scale(${ 1 / ratio }, ${ 1 / ratio })`;
	el.style.inset = `50% -50% -50% 50%`;
	el.style.position = `absolute`;
}

function browser_is_chrome(){
	let _browser_is_chrome = navigator.userAgent.includes("Chrome") && navigator.vendor.includes("Google Inc");
	return _browser_is_chrome;
}