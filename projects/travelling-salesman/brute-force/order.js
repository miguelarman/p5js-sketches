var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function setup() {
  createCanvas(400, 300);
}

function draw() {

  // Step 1
  var largestI = -1;
  for (var i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    console.log('finished');
    noLoop();
  }

  // Step 2
  var largestJ = -1;
  for (var j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  // Step 3
  swap(vals, largestI, largestJ);

  // Step 4
  var endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);


  background(0);
  textSize(64);
  var s = '';
  for (var i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255);
  text(s, 20, height / 2);

}

function swap(a, i, j) {
  var aux = a[i];
  a[i] = a[j];
  a[j] = aux;
}
