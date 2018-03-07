// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 10PRINT
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs

let x = 0;
let y = 0;
let xspacing = 20;
let yspacing = 20;

function setup() {
  // createCanvas(400, 400);
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
}

function draw() {
  stroke(255);
  if (random(1) < 0.5) {
    line(x, y, x + xspacing, y + yspacing);
  } else {
    line(x, y + yspacing, x + xspacing, y);
  }
  x = x + xspacing;
  if (x > width) {
    x = 0;
    y = y + yspacing;
  }

  if (y > height) {
    noLoop();
    console.log("Así que alguien está leyendo esto...");
  }

}