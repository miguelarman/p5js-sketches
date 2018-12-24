class Snowflake {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
  }

  update() {
    this.pos.x -= 1;
    this.pos.y += random(-3, 3);

    let angle = this.pos.heading();
    if (angle > PI/6) {
      angle = PI/6;
    }
    if (angle < 0) {
      angle = 0;
    }
    let mag = this.pos.mag();
    this.pos = p5.Vector.fromAngle(angle);
    this.pos.setMag(mag);
  }

  show() {
    fill(255);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  intersects(snowflake) {
    for (let s of snowflake) {
      let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y);
      if (d < this.r + s.r) {
        return true;
      }
    }
    return false;
  }

  finished() {
    return (this.pos.x < 1);
  }

}
