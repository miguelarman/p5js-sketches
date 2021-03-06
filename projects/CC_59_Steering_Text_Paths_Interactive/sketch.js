// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];

var name = "";

var input;
var button;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 300);

  input = createInput("New word");
  button = createButton("Go!");
  button.mousePressed(newText);

  background(51);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text('Miguel', 100, 200);

  var points = font.textToPoints('Miguel', 75, 200, 152, {
    sampleFactor: 0.15
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}



function newText() {

  name = input.value();
  vehicles = [];

  var points = font.textToPoints(name, 75, 200, 152, {
    sampleFactor: 0.15
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}