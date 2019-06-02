class Boundary {
  constructor(x, y, xx, yy) {
    this.a = createVector(x, y);
    this.b = createVector(xx, yy);
  }

  show() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
