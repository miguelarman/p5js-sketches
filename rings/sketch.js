let rings = [];
let totalRings = 1000;
let distance = 50;
let slider;

function setup () {
	// createCanvas(window.innerWidth, window.innerHeight);
	createCanvas(800, 600);

	for (var i = 0; i < totalRings; i++) {
		var ring = new Ring(random(width), random(height));

		rings.push(ring);
	}

	slider = createSlider(0, 100, 20, 1);

}

function draw () {
	// for (var i = 0; i < rings.length; i++) {
	// 	rings[i].show();
	// }
	if (mouseIsPressed && mouseX < width && mouseY < height) {
		background(255);
		// frameRate(30);
	} else {
		// frameRate(30);
	}


	for (var i = 0; i < rings.length; i++) {
		rings[i].show();

		// rings[i].x += random(distance) - distance/2;
		// rings[i].y += random(distance) - distance/2;

		var sliderValue = slider.value();

		rings[i].x += random(sliderValue) - sliderValue/2;
		rings[i].y += random(sliderValue) - sliderValue/2;
	}

	// rings[floor(random(rings.length))].x += random(10) - 5;
	// rings[floor(random(rings.length))].y += random(10) - 5;


}



function Ring(x, y) {
  this.x = x;
  this.y = y;
  this.radius = random(2, 35);
  this.strokeWeight = random(2, 5);
  this.r = floor(random(255));
  this.g = floor(random(255));
  this.b = floor(random(255));;

  

  this.show = function() {
    stroke(this.r, this.g, this.b);
    strokeWeight(this.strokeWeight);
    noFill();
    ellipse(this.x, this.y, this.radius, this.radius);
  }

}