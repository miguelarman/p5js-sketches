// Diceware generator

let button;
let input;
let dw;
let password;

function preload() {
  // Get the most recent earthquake in the database
  let url = 'https://miguelarman.github.io/p5js-sketches/projects/diceware/diceware.json';
  dw = loadJSON(url);
  console.log('Diceware loaded');
}

function setup() {
  createCanvas(400, 440);
  input = createInput('Number of words');
  button = createButton('generate');
  button.mousePressed(update);
  background(220);
  text('Enter number of words (1-10) and press the button', 70, 190);

  noLoop();

  createElement('h2', 'Notes:');
  createP('In order to choose your password, change the list of words, mix the resulting words, add punctuation, change lowercase... Be random');
  createP('To be even more secure, use some regular dices at home (computer do not generate completely random numbers)');
  createA(url, 'Link of words');
}

function update() {
  fill(0);
  password = '';

  let words = input.value();
  if (isNaN(words) || words < 1 || words > 10) {
    console.error('Select number between 1 and 10');
    return;
	}
  console.log('You selected ' + words + ' words');

  background(220);

  let y = 10;
  for (let i = 1; i <= words; i++) {
    text('Word ' + i + ' out of ' + words + ':', 0, y);
    y += 15;
    let dice = 0;

    for (let j = 0; j < 5; j++) {
      dice *= 10;
      dice += floor(random(6)) + 1;
    }

    text('\t' + dice + ': ' + dw[dice], 0, y);
    y += 25;

    password += dw[dice] + ' ';
  }

  text('Your random password is:\n\t' + password, 0, y);
}
