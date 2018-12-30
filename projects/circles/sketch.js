let circles = [];
let totalCircles = 10000;


function setup () {
	colorMode(HSB);

	createCanvas(400, 400);
	background(0);



	// fill(255, 255, 255);
	// noStroke();
	// ellipse(0, 0, 100);

	for (let i = 0; i < totalCircles; i++) {
		let circle = new Circle();
		circle.add();
	}

	for (let j = 0; j < circles.length; j++) {
		circles[j].show();
	}
}

// function draw() {
// 	fill(255);
// 	noStroke();
// 	ellipse(random(0, width), random(0, height), 60);
// }




function Circle () {
	this.x = random(width);
	this.y = random(height);
	this.r = random(60);
	this.hu = map(this.r, 0, 60, 255, 50);


	this.show = function() {
		fill(this.hu, 255, 255);
	    noStroke();
		ellipse(this.x, this.y, this.r * 2);
	}

	this.add = function() {
		let canBeAdded = true;

		if (circles.length == 0) {
			canBeAdded = true;
		} else if (this.x - this.r < 0 || this.y - this.r < 0 || this.x + this.r > width || this.y + this.r > height) {
			canBeAdded = false;
		} else {
			for (let k = 0; k < circles.length; k++) {
				let diffx = this.x - circles[k].x;
				let diffy = this.y - circles[k].y;

				let distance = sqrt(pow(diffx, 2) + pow(diffy, 2));

				if (distance < this.r + circles[k].r) {
					canBeAdded = false;
					break;
				}
			}
		}

		if (canBeAdded) {
			circles.push(this);
		} else {
			// console.log(this);
		}
	}
}