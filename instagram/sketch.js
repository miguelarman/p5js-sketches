function setup() {
  createCanvas(400, 400);
	background(220);

  var params = getURLParams();
  fill(0);
  text('Your code is ' + params.code, 10, 80);
}

function draw() {

}
