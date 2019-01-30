// Cicloides

let path = [];
let radius = 50;
let angle = 0;

let yoffset = 50;
let xoffset = 30;


function setup() {
  createCanvas(600, 300);
}

function draw() {
  background(0);

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

  let pointx = x + cos(angle + HALF_PI) * radius;
  let pointy = height - yoffset - radius + sin(angle + HALF_PI) * radius;

  ellipse(pointx, pointy, 5);
  line(pointx, pointy, x, height - yoffset - radius);

  path.push(createVector(pointx, pointy));

  // Caminos
  noFill();

  stroke(255);
  beginShape();
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();


  angle += 0.02;
  if (x + radius > width - xoffset) {
    angle = 0;
    path = [];
  }
}
