let R = 155;
let r = 22;
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
  let centerx = (R + r) * sin(alfa + PI);
  let centery = (R + r) * cos(alfa + PI);
  noFill();
  ellipse(centerx, centery, r * 2);

  let beta = alfa * R / r;
  let delta = alfa + beta;
  let pointx = centerx - cos(delta + HALF_PI) * r;
  let pointy = centery + sin(delta + HALF_PI) * r;

  line(centerx, centery, pointx, pointy);

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

  alfa += 0.02;

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
