var radios = [50, 100, 150, 200, 300];
var cx, cy;
var secondsRadius;
var minutesRadius;
var hoursRadius;
var clockDiameter;
var lineas_por_iteracion = 50;

function setup() {
  createCanvas(400, 400);
  background(255);
  
  cx = width / 2;
  cy = height / 2;
  
  var radius = min(width, height) / 2;
  secondsRadius = radius * 0.72;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.40;
  clockDiameter = radius * 1.8;
}

function draw() {
  for (var i = 0; i < lineas_por_iteracion; i++) {
    var r = radios[floor(random(0, radios.length))];
    var angle = floor(random(0, 360));
    var x = floor(r * cos(radians(angle)));
    var y = floor(r * sin(radians(angle)));
    
    strokeWeight(4);
    stroke(floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)));
    
    line(width / 2, height / 2, width / 2 + x, height / 2 + y);
  }
  
  fill(0);
  //if (frameCount % 50 == 0) {
    dibujarHora();
  //}
}


function dibujarHora() {
  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  
  // Draw the hands of the clock
  stroke(0);
  strokeWeight(1);strokeWeight(16);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);strokeWeight(16);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);strokeWeight(16);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  
  stroke(255);
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
}