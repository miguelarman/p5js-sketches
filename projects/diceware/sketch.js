// Diceware generator

let button;
let input;
let dw;

function preload() {
  // Get the most recent earthquake in the database
  let url = 'https://miguelarman.github.io/p5js-sketches/projects/diceware/diceware.json';
  dw = loadJSON(url);
  console.log(dw);
  console.log('Diceware loaded');
}

function setup() {
  createCanvas(400, 400);
  input = createInput('Number of words');
  button = createButton('generate');
  button.mousePressed(update);
  background(220);
  text('Enter number of words and press the button', 70, 190);

  noLoop();
}

function update() {
  fill(0);

  let words = input.value();
  if (isNaN(words) || words < 1 || words > 10) {
    console.error('Select number between 1 and 10');
    return;
	}
  console.log('You selected ' + words + ' words');

  background(220);

  let y = 10;
  for (let i = 0; i < words; i++) {
    text('Word ' + i + ' out of ' + words + ':', 0, y);
    y += 15;
    let dice = 0;

    for (let j = 0; j < 6; j++) {
      dice *= 10;
      dice += floor(random(6)) + 1;
    }

    text('\t' + dice, 0, y);
    y += 25;
  }
}
