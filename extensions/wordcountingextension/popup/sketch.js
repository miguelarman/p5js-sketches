function setup() {
	noCanvas();

	createP("Key: Count");

	let msg = {
		txt: "Popup"
	}
	chrome.runtime.sendMessage(msg, function(response) {
		// Deal with the response
		console.log(response);
		for (key of response.keys) {
			createP(key + ": " + msg.counts[key]);
		}
	});

	// var keys = chrome.extension.getBackgroundPage().keys;
	// var counts = chrome.extension.getBackgroundPage().counts;

	// for (key of keys) {
	// 	createP(key + ": " + counts[key]);
	// }
}