// Cicloides

let apath = [];
let bpath = [];
let cpath = [];
let radius = 50;
let angle = 0;
let offset = 10;

let yoffset = 50;
let xoffset = 30;

let slider;


function setup() {
  createCanvas(600, 300);
  slider = createSlider(0, 20, 0);
}

function draw() {
  background(0);

  offset = slider.value();

  // Eje X
  stroke(255, 100);
  line(xoffset, height - yoffset, width - xoffset, height - yoffset);
  line(xoffset, yoffset, xoffset, height- yoffset);

  // Circulo
  let x = map(angle, 0, TWO_PI, xoffset, xoffset + radius * TWO_PI);
  noFill();
  ellipse(x, height - yoffset - radius, radius * 2);

  // Punto
  fill(255, 100);

  let apointx = x + cos(angle + HALF_PI) * (radius - offset);
  let apointy = height - yoffset - radius + sin(angle + HALF_PI) * (radius - offset);

  let bpointx = x + cos(angle + HALF_PI) * radius;
  let bpointy = height - yoffset - radius + sin(angle + HALF_PI) * radius;

  let cpointx = x + cos(angle + HALF_PI) * (radius + offset);
  let cpointy = height - yoffset - radius + sin(angle + HALF_PI) * (radius + offset);

  ellipse(apointx, apointy, 3);
  ellipse(bpointx, bpointy, 5);
  ellipse(cpointx, cpointy, 3);
  line(cpointx, cpointy, x, height - yoffset - radius);

  apath.push(createVector(apointx, apointy));
  bpath.push(createVector(bpointx, bpointy));
  cpath.push(createVector(cpointx, cpointy));

  // Caminos
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


  angle += 0.02;
  if (x + radius > width - xoffset) {
    angle = 0;
    apath = [];
    bpath = [];
    cpath = [];
  }
}
