var cities = [];
var totalCities = 10;

var recordDistance;
var bestEver;

function setup() {
  createCanvas(400, 300);
  for(var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  }

  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
}

function draw() {
  background(0);
  fill(255);
  for(var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for(var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < cities.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  var i = floor(random(cities.length));
  var j = (i + 1) % cities.length;
  swap(cities, i, j);

  var d = calcDistance(cities);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = cities.slice();
  }


}





function swap(a, i, j) {
  var aux = a[i];
  a[i] = a[j];
  a[j] = aux;
}

function calcDistance(points) {
  var d = 0;
  for (var i = 0; i < points.length - 1; i++) {
    d += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
  }
  return d;
}
