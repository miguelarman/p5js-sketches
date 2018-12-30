class Curve {
  
  constructor() {
    this.points = [];
    this.newPoint = createVector();
    
    this.c = color(floor(random(255)), floor(random(255)), floor(random(255)));
  }
  
  setX (x) {
    this.newPoint.x = x;
  }
  
  setY (y) {
    this.newPoint.y = y;
  }
  
  addPoint() {
    this.points.push(this.newPoint);
    
    this.newPoint = createVector();
  }
  
  clear() {
    this.points = [];
  }
  
  show() {
    stroke(this.c);
    strokeWeight(2);
    
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}