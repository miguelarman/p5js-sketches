console.log("Background ready");

let keys = [];
let counts = {};

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
	let msg = {
		txt: "Button clicked"
	}
	chrome.tabs.sendMessage(tab.id, msg, function(response) {
		keys = response.keys;
		counts = reponse.counts;

		console.log(response.keys);
	});
}