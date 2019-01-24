console.log("Extension ready");

let paragraphs = document.getElementsByTagName("p");

var words = [];
var counts = {};
var keys = [];

for (p of paragraphs) {
	var ptxt = p.innerHTML;
	ptxt = ptxt.replace(/\./g, '');
	var pwords = ptxt.split(' ');

	for (w of pwords) {
		words.push(w);
	}
}

var allwords = words.join("\n");
var tokens = allwords.split(/\W+/);
for (var i = 0; i < tokens.length; i++) {
  var word = tokens[i].toLowerCase();
  if (!/\d+/.test(word)) {
    if (counts[word] === undefined) {
      counts[word] = 1;
      keys.push(word);
    } else {
      counts[word] = counts[word] + 1;
    }
  }
}

keys.sort(compare);

function compare(a, b) {
	var countA = counts[a];
	var countB = counts[b];
	return countB - countA;
}

//for (var i = 0; i < keys.length; i++) {
//  var key = keys[i];
//  createDiv(key + " " + counts[key]);
//}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	console.log(message.txt);
	if (message.txt == "Button clicked") {
		sendResponse({
			counts,
			keys
		});
	} else if (message.txt == "Popup") {
		var msg = {
			counts,
			keys
		};
		console.log("response");
		console.log(msg);
		sendResponse(msg);
	}
}