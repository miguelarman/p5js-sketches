let R = 250;
let r = 70;
let alfa = 0;
let path = [];

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  noFill();
  stroke(255, 100);
  ellipse(0, 0, R * 2);

  // Center
  let centerx = (R - r) * cos(alfa - HALF_PI);
  let centery = (R - r) * sin(alfa - HALF_PI);
  noFill();
  ellipse(centerx, centery, r * 2);

  let beta = alfa * R / r;
  let delta = alfa - beta;
  let pointx = centerx + cos(delta - HALF_PI) * r;
  let pointy = centery + sin(delta - HALF_PI) * r;

  fill(255, 100);
  ellipse(pointx, pointy, 5);

  path.push(createVector(pointx, pointy));

  noFill();
  stroke(255);
  beginShape();
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();

  alfa += 0.1;

  console.log(alfa / HALF_PI);

  // if (alfa / HALF_PI >= lcm(R, r) / R) {
  //   alfa = 0;
  //   path = [];
  // }
}

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
