// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ERQcYaaZ6F0

var circles;
var img;

function preload() {
  // img = loadImage("assets/kitten.jpg");
  // img = loadImage("assets/margarita.jpg");
  // img = loadImage("assets/rajoy.jpg");
  // img = loadImage("assets/garzon.jpg");
  // img = loadImage("assets/albertogarzon.png");
  // img = loadImage("assets/garzon2.jpg");
  // img = loadImage("assets/ntmep.jpg");
  img = loadImage("assets/lenin.jpg");
  

  // img = loadImage("assets/ntmep2.jpg");
  // img = loadImage("assets/ntmep3.jpg");
  // img = loadImage("assets/ntmep4.jpg");
  // img = loadImage("assets/ntmep5.jpg");
  // img = loadImage("assets/ntmep6.jpg");

}

function setup() {
  // createCanvas(600, 600);
  // createCanvas(1980, 1289);
  // createCanvas(1500, 1000);
  // createCanvas(400, 400);
  // createCanvas(1400, 799);
  // createCanvas(1600, 1163);
  // createCanvas(400, 400);
  createCanvas(1734, 2560);
  

  // createCanvas(1024, 512);
  // createCanvas(2120, 1192);
  // createCanvas(700, 272);
  // createCanvas(1500, 1010);
  // createCanvas(1280, 720);


  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log(density)
}

function draw() {
  background(0);

  var total = 30;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index+1];
    var b = img.pixels[index+2];
    var c = color(r,g,b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}