let R = 155;
let r = 22;
let alfa = 0;
let apath = [];
let bpath = [];
let cpath = [];

let slider;

function setup() {
  createCanvas(500, 500);
  slider = createSlider(0, 20, 0);
}

function draw() {
  background(0);

  let offset = slider.value();

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

  let apointx = centerx - cos(delta + HALF_PI) * (r - offset);
  let apointy = centery + sin(delta + HALF_PI) * (r - offset);

  let bpointx = centerx - cos(delta + HALF_PI) * r;
  let bpointy = centery + sin(delta + HALF_PI) * r;

  let cpointx = centerx - cos(delta + HALF_PI) * (r + offset);
  let cpointy = centery + sin(delta + HALF_PI) * (r + offset);

  line(centerx, centery, cpointx, cpointy);

  fill(255, 100);
  ellipse(apointx, apointy, 3);
  ellipse(bpointx, bpointy, 5);
  ellipse(cpointx, cpointy, 3);

  apath.push(createVector(apointx, apointy));
  bpath.push(createVector(bpointx, bpointy));
  cpath.push(createVector(cpointx, cpointy));

  noFill();

  stroke(255, 0, 0);
  beginShape();
  for (let v of apath) {
    vertex(v.x, v.y);
  }
  endShape();

  stroke(0, 0, 255);
  beginShape();
  for (let v of bpath) {
    vertex(v.x, v.y);
  }
  endShape();

  stroke(0, 255, 0);
  beginShape();
  for (let v of cpath) {
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
