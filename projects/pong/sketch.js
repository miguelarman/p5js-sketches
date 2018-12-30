let player1;
let player2;
let ball;

let spaceWall = 10;

let rectHeight = 50;
let rectWidth = 10;
let ballR = 10;

let xMin = 0.05;

let velocidad = 3;

let intervalo = 20;

let goles1 = 0;
let goles2 = 0;

let maxGoles = 2;


function setup() {

	createCanvas(600, 400);
	rectMode(CENTER);

	player1 = {
		x : 0 + spaceWall,
		y : height/2
	}

	player2 = {
		x : width - spaceWall,
		y : height/2
	}

	ball = {
		pos : createVector(width / 2 + random(100) - 50, height / 2 + random(100) - 50),
		vel : p5.Vector.random2D().mult(velocidad)
	}

	while (abs(ball.vel.x) < xMin) {
		ball.vel = p5.Vector.random2D().mult(velocidad);
	}

	background(0);

	noStroke();
	fill(255);

	drawPlayer1();
	drawPlayer2();
	drawBall();
}


function draw() {

	background(0);
	
	updateBall();


	drawPlayer1();
	drawPlayer2();
	drawBall();

	if (ball.pos.x - ballR <= 0) {
		// noLoop();
		console.log("player 2 scored!");
		goles2++;

		if (goles2 == maxGoles) {
			console.log("player 2 wins!");
			noLoop();
		}

		restartBall();
		restartPlayers();
	} else if (ball.pos.x + ballR >= width) {
		// noLoop();
		console.log("player 1 scored!");
		goles1++;

		if (goles1 == maxGoles) {
			console.log("player 2 wins!");
			noLoop();
		}

		restartBall();
		restartPlayers();
	}

	drawText();
}


function drawPlayer1() {
	rect(player1.x, player1.y, rectWidth, rectHeight);
}


function drawPlayer2() {
	rect(player2.x, player2.y, rectWidth, rectHeight);
}


function drawBall() {
	ellipse(ball.pos.x, ball.pos.y, ballR * 2, ballR * 2);
}


function updateBall() {
	if (ball.pos.y + ballR > height) { // pasa por abajo
		ball.vel.y  *= (-1);

		// if (random(1) > 0.9) {
		// 	ball.vel = p5.Vector.random2D();
		// 	ball.vel.y = abs(ball.vel.y);
		// } 
	} else if (ball.pos.y - ballR < 0) { // pasa por arriba
		ball.vel.y  *= (-1);

		// if (random(1) > 0.9) {
		// 	ball.vel = p5.Vector.random2D();
		// 	ball.vel.y = - abs(ball.vel.y);
		// }
	} else if (ball.pos.x + ballR >= width - spaceWall - rectWidth/2) { // choca con el 1
		if (ball.pos.y < player2.y + rectHeight/2 && ball.pos.y > player2.y - rectHeight/2) {
			ball.vel.x *= (-1);

			if (random(1) > 0.9) {
				ball.vel = p5.Vector.random2D();
				ball.vel.x = abs(ball.vel.x);
			}
		}
	} else if (ball.pos.x - ballR <= spaceWall + rectWidth/2) { // choca con el 2
		if (ball.pos.y < player1.y + rectHeight/2 && ball.pos.y > player1.y - rectHeight/2) {
			ball.vel.x *= (-1);

			if (random(1) > 0.9) {
				ball.vel = p5.Vector.random2D();
				ball.vel.x = - abs(ball.vel.x);
			}
		}
	}

	ball.pos.add(ball.vel);
}


function keyPressed() {
	while (keyIsDown(UP_ARROW)) {
		player1.y -= intervalo;
		player2.y -= intervalo;
	}

	while (keyIsDown(DOWN_ARROW)) {
		player1.y += intervalo;
		player2.y += intervalo;
	}

}


function restartBall() {
	ball.pos = createVector(width / 2 + random(100) - 50, height / 2 + random(100) - 50);
	ball.vel = p5.Vector.random2D().mult(velocidad);
}





function drawText() {
	var texto = "" + goles1 + " - " + goles2;
	textAlign(CENTER);
	textSize(12);
	text(texto, width/2, 50);
}

function restartPlayers() {
	player1.x = 0 + spaceWall;
	player1.y = height/2;

	player2.x = width - spaceWall;
	player2.y = height/2;
}