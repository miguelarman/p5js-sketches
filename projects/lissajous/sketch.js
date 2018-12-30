var angle = 0;

var w;
var cols, rows;

var curves;

function make2DArray(rows, cols) {
  var arr = new Array(rows); //like arr[]; but with number of columns hardcoded
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function setup() {
  createCanvas(600, 600);
  
  w = 60;
  
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  
  curves = make2DArray(rows,cols);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }
}

function draw () {  
  background(0);
  
  var d = 0.9 * w;
  var r = d / 2;
  
  // Draw top circles
  noFill();
  for (let i = 0; i < cols; i++) {
    var cx = w * (i + 1) + w / 2;
    var cy = w / 2;
    
    strokeWeight(1);
    stroke(255);
    ellipse(cx, cy, d, d);
    
    var px = r * cos(angle * (i + 1) - HALF_PI);
    var py = r * sin(angle * (i + 1) - HALF_PI);
    
    strokeWeight(8);
    point(px + cx, py + cy);
    
    for (let j = 0; j < cols; j++) {
      curves[i][j].setX(px + cx);
    }
    
    strokeWeight(1);
    stroke(255, 50);
    line(px + cx, 0, px + cx, height);
  }
  
  // Draw side circles
  noFill();
  strokeWeight(1);
  stroke(255);
  for (let j = 0; j < rows; j++) {
    var cy = w * (j + 1) + w / 2;
    var cx = w / 2;
    
    
    strokeWeight(1);
    stroke(255);
    ellipse(cx, cy, d, d);
    
    var px = r * cos(angle * (j + 1) - HALF_PI);
    var py = r * sin(angle * (j + 1) - HALF_PI);
    
    for (let i = 0; i < rows; i++) {
      curves[i][j].setY(py + cy);
    }
    
    strokeWeight(8);
    point(px + cx, py + cy);
    
    strokeWeight(1);
    stroke(255, 50);
    line(0, py + cy, width, py + cy);
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      curves[i][j].addPoint();
    }
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      curves[i][j].show();
    }
  }
  
  angle += 0.01;
  
  if (angle > TWO_PI) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        curves[i][j].clear();
      }
    }
    
    angle = 0;
    save("lissajous(" + day() + "/" + month() + "." + hour() + ":" + minute() + ").png");
    
    noLoop();
  }
}