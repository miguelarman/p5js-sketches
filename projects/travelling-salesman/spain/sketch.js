var totalCities;

var order = [];
var cities = [];
var nCities = 8;

var totalPermutations;
var count = 1;


var recordDistance;
var bestEver;

var mapimg;

var clat = 40;
var clon = -4;

var cx;
var cy;

var ww = 768;
var hh = 512;

var zoom = 5;

// var style = 'dark-v9';
var style = 'dark-v10';
// var style = 'satellite-v9';

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/' +
    style + '/static/' + clon + ',' + clat + ',' + zoom + '/' + ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoibWlndWVsYXJtYW4iLCJhIjoiY2pyeGYzcWl6MGt1ZzN5cGt3d2J2cjIxeSJ9.KGm8Dy1naBTPhbWkxj0p8w');
}

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  totalCities = ccaa.length;
  console.log(nCities + ' out of ' + totalCities);
  if (nCities > totalCities) {
    console.log('SELECT BETWEEN 1 AND ' + totalCities);
    noLoop();
  }


  cx = mercX(clon);
  cy = mercY(clat);

  for (var i = 0; i < ccaa.length; i++) {
    var x = mercX(ccaa[i].lon) - cx;
    var y = mercY(ccaa[i].lat) - cy;
    if (x < - width / 2) {
      x += width;
    } else if (x > width / 2) {
      x -= width;
    }
    var v = createVector(x, y);
    cities[i] = v;
  }

  console.log('');
  console.log('');
  console.log('Cities to visit');
  for (var i = 0; i < nCities; i++) {
    var aux = floor(random(ccaa.length));
    while (order.includes(aux)) {
      var aux = floor(random(ccaa.length));
    }
    order[i] = aux;
    console.log(ccaa[aux].nombre);
  }
  order.sort((a,b) => (a - b));
  console.log('');
  console.log('');


  var d = calcDistance(cities, order);
  recordDistance = 10000000000;//d;
  bestEver = order.slice();

  totalPermutations = factorial(nCities);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  fill(255);

  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 16, 16);
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
    // Imprimir nueva solucion
    console.log('');
    console.log('New best path:');
    printSolution();
  }

  noStroke();
  fill(0);
  rect(-width / 2, height / 2 - 50, width / 2 - 20, 40);

  textSize(32);
  // var s = '';
  // for (var i = 0; i < order.length; i++) {
  //   s += order[i];
  // }
  fill(255);
  var percent = 100 * (count / totalPermutations);
  text(nf(percent, 0, 6) + '% completed', -width / 2 + 20, height / 2 - 20);


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

    // Imprimir solucion
    console.log('');
    console.log('Solution:');
    printSolution();
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

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function printSolution() {
  s = '';

  for (var i = 0; i < order.length - 1; i++) {
    s += ccaa[bestEver[i]].nombre + '->';
  }
  s += ccaa[bestEver[bestEver.length - 1]].nombre;

  console.log(s);
}
