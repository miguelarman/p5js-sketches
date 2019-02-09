var cities = [];
var totalCities = 8;

var order = [];

var totalPermutations;
var count = 1;


var recordDistance;
var bestEver;

function setup() {
  createCanvas(400, 600);
  for(var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  var d = calcDistance(cities, order);
  recordDistance = d;
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);
}

function draw() {
  background(0);
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  stroke(255, 0, 255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    var index = bestEver[i];
    vertex(cities[index].x, cities[index].y);
  }
  endShape();

  translate(0, height / 2);

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var index = order[i];
    vertex(cities[index].x, cities[index].y);
  }
  endShape();


  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
  }

  textSize(32);
  // var s = '';
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  var percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 6) + '% completed', 20, height / 2- 50);

  nextOrder();

}





function swap(a, i, j) {
  var aux = a[i];
  a[i] = a[j];
  a[j] = aux;
}

function calcDistance(points, order) {
  var d = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    d += dist(cityA.x, cityA.y, cityB.x, cityB.y)
  }
  return d;
}






function nextOrder() {
  count++;

  // Step 1
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    console.log('finished');
    noLoop();
  }

  // Step 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // Step 3
  swap(order, largestI, largestJ);

  // Step 4
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
