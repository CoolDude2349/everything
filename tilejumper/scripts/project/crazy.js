async function getUser() {
	if (window.CrazyGames && window.CrazyGames.SDK) {
		try {
// 			await window.CrazyGames.SDK.init();
// 			window.CrazyGames.SDK.game.loadingStart();

			const user = await window.CrazyGames.SDK.user.getUser();

			if (user && user != null) {
				var userData = await getUserToken();
				c3_callFunction("GetUserResult", [JSON.stringify(userData)])
			}
			else {
				c3_callFunction("ShowCrazyLoginButton");
			}

			addAuthListener();

		} catch (error) {
			console.error('Failed to initialize CrazyGames SDK:', error);
		}

	} else {
		console.error('CrazyGames SDK not found.');
	}
}

async function getUserToken() {
	try {
		const token = await window.CrazyGames.SDK.user.getUserToken();
		function base64UrlDecode(str) {
			// Replace non-base64 characters with their base64 equivalents
			str = str.replace(/-/g, '+').replace(/_/g, '/');
			// Pad with '=' if necessary
			switch (str.length % 4) {
				case 0: break;
				case 2: str += '=='; break;
				case 3: str += '='; break;
				default: throw 'Illegal base64url string!';
			}
			// Decode base64 to binary
			return atob(str);
		}

		function decodeJWT(jwt) {
			const [header, payload] = jwt.split('.').map(base64UrlDecode);
			return {
				header: JSON.parse(header),
				payload: JSON.parse(payload)
			};
		}
		var user = decodeJWT(token).payload
		return user


	} catch (e) {
		console.log("Error:", e);
	}
}

async function showAuthPrompt() {
	if (window.CrazyGames && window.CrazyGames.SDK) {
		try {
			const user = await window.CrazyGames.SDK.user.showAuthPrompt();
			console.log("Auth prompt result", user);

			var userData = await getUserToken()
			c3_callFunction("GetUserResult", [JSON.stringify(userData)])

		} catch (e) {
			console.log("Error:", e);
		}
	}
}

const listener = async(user) => {
	
	
	if (user) {
		var userData = await getUserToken()
		c3_callFunction("CrazyLogin", [JSON.stringify(userData)])
		
	}
	
// 	else
// 	{
// 		c3_callFunction("GuestLogin");
// 	}
	
	
};


function addAuthListener() {
	if (window.CrazyGames && window.CrazyGames.SDK) {
		window.CrazyGames.SDK.user.addAuthListener(listener);
		
	}
	
	
}

function removeAuthListener() {
	if (window.CrazyGames && window.CrazyGames.SDK) {
		window.CrazyGames.SDK.user.removeAuthListener(listener);
	}
}

function generateRandomID(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export {getUser, showAuthPrompt, addAuthListener, removeAuthListener, generateRandomID};
