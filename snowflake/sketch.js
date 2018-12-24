let current;
let snowflake = [];
let r = 2;
let max = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  current = new Snowflake(width/2, random(10), r);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  rotate(PI/6);


  while (!current.finished() && !current.intersects(snowflake)) {
    current.update();
  }

  snowflake.push(current);
  current = new Snowflake(width/2, 0, r);


  for (let i = 0; i < 6; i++) {
    rotate(PI/3);
    current.show();
    for (let s of snowflake) {
      s.show();
    }
  }

  scale(1, -1);

  for (let i = 0; i < 6; i++) {
    rotate(PI/3);
    current.show();
    for (let s of snowflake) {
      s.show();
    }
  }
  
  if (snowflake.length > max) {
    saveCanvas('image', 'png');
  }
}
