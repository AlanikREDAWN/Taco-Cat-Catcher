//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
//sprites
let catcher, fallingObject, badFallingObject;
let score = 0;
let highScore = 0;
//images
let backgroundImg;
let catcherImg;
let fallingObjectImg1;
let fallingObjectImg2;
let badFallingObjectImg;
// let fallingObjects; -> see line 39
//colors
let rebeccaPurple = '#6c5190';
let greenColor = '#519053';
let bgColor = '#4ECDC4';
let textColor = '#008080';
let highScoreColor = '#d3eddc';

/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg =     loadImage('assets/burritoCat.gif');
  catcherImg = loadImage("assets/plate.gif");
  fallingObjectImg1 = loadImage("assets/tacoCat1.gif");
  fallingObjectImg2 = loadImage("assets/tacoCat2.gif");
  badFallingObjectImg = loadImage("assets/pugBurger.gif");
}

/* SETUP RUNS ONCE */
function setup() {
  
  createCanvas(400,400);
  // noSmooth();
  // pixelDensity(displayDensity());

  // noFill();
  // fallingObjects = [fallingObjectImg1, fallingObjectImg2]; -> TO-DO: figure out how to make image for fallingObject sprite random (50% chance of each image)
  
  //resize images
  backgroundImg.resize(60, 0);
  catcherImg.resize(80, 0);
  fallingObjectImg1.resize(45, 0);
  fallingObjectImg2.resize(45, 0);
  badFallingObjectImg.resize(45, 0);

  //Create catcher 
  catcher = createSprite(catcherImg, 200, 380, 'k');
  // catcher.color = color(95,158,160);
  // catcher.debug = true;
  
  //Create falling objects
  fallingObject = new Sprite(fallingObjectImg1, 100,0,10);
  // fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  //TO-DO: figure out if I can delay the creation of this sprite for a few secs
  badFallingObject = new Sprite(badFallingObjectImg, 100, 0, 10);
  badFallingObject.color = color(0,128,128);
  badFallingObject.vel.y = 2;
  badFallingObject.rotationLock = true;

  //debug
  // allSprites.debug = true;

}

/* DRAW LOOP REPEATS */
function draw() {
  //set up screen
  // catcher.debug = true;
  // console.log(catcher.debug);
  background(bgColor);
  //Draw background image
  image(backgroundImg, 230, 5);

  fill(textColor);
  textSize(12);
  // Draw directions to screen
  textAlign('right', 'baseline');
  text("Move the plate \n with the left and \n right arrow keys \n to catch the taco \n cats and avoid \n the imposters", width-10, 20);

  //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    score -= 1;
  }
  //If badFallingObject reaches bottom, move back to random position at top
  if (badFallingObject.y >= height) {
    badFallingObject.y = 0;
    badFallingObject.x = random(width);
    badFallingObject.vel.y = random(1, 5);
  }

  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  //If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = 'down';
    score += 1;
  }

  //If badFallingObject collides with catcher, move back to random position at top
  if (badFallingObject.collides(catcher)) {
    badFallingObject.y = 0;
    badFallingObject.x = random(width);
    badFallingObject.vel.y = random(1, 5);
    badFallingObject.direction = 'down';
    score -= 1;
  }

  if (fallingObject.collides(badFallingObject)) {
    fallingObject.direction = 'down';
    badFallingObject.direction = 'down';
  }

  //Display score
  textAlign('left', 'bottom');
  textStyle('bold');
  textSize(16);
  fill(textColor);
  text('Score: ' + score, 10, 25);

  //Create lose state
  if (score < 0) {
    catcher.x = 500;
    fallingObject.y = -500;
    badFallingObject.x = -500;
    background(bgColor);
    textSize(30);
    textAlign('center');
    fill(textColor);
    text('You lost!', 200, 200);

    textSize(15);
    textStyle('normal');
    fill(highScoreColor);
    text('Click anywhere to play again', 200, 220);
    restart();
  }

  youWin();

  // console.log(catcher.debug);
  //debug
  // allSprites.debug = mouse.pressing();
}

function restart() {
  if (mouseIsPressed) {
    score = 0;
    catcher.x = 200;
    catcher.y = 380;
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = 'down';
    badFallingObject.y = 0;
    badFallingObject.x = random(width);
    badFallingObject.color = color(0,128,128);
    badFallingObject.vel.y = 2;
    badFallingObject.direction = 'down';
  }
}

function youWin() {
  //Create win state
  if (score > 5) {
    catcher.x = 500;
    fallingObject.y = -500;
    badFallingObject.x = -500;
    background(bgColor);
    textSize(30);
    textAlign('center');
    fill(highScoreColor);
    text('You win!', 200, 200);

    textSize(15);
    textStyle('normal');
    fill(textColor);
    text('Click anywhere to play again', 200, 220);
    restart();
  }
}

// function keyPressed() {
//   catcher.debug = !catcher.debug;
// }