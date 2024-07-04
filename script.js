//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
//sprites
let catcher, fallingObject, badFallingObject;
let playButton, directionsButton, backButton;
//ints
let score = 0;
let highScore = 0;
let screen = 0;
//images
var backgroundImg;
var catcherImg;
var fallingObjectImg1;
var fallingObjectImg2;
var badFallingObjectImg;
// let fallingObjects; -> see line 39
//colors
let rebeccaPurple = '#6c5190';
let greenColor = '#519053';
var bgColor = '#4ECDC4';
let textColor = '#008080';
let highScoreColor = '#d3eddc';

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage('assets/burritoCat.gif');
  // backgroundImg = loadImage('assets/old/burritoCat_old.png');
  catcherImg = loadImage("assets/plate.gif");
  // catcherImg = loadImage("assets/old/plate_old.png");
  fallingObjectImg1 = loadImage("assets/tacoCat1.gif");
  // fallingObjectImg1 = loadImage("assets/old/tacoCat1_old.png");
  fallingObjectImg2 = loadImage("assets/tacoCat2.gif");
  // fallingObjectImg2 = loadImage("assets/old/tacoCat2_old.png");
  badFallingObjectImg = loadImage("assets/pugBurger.gif");
   // badFallingObjectImg = loadImage("assets/old/pugBurger_old.png");
}

/* SETUP RUNS ONCE */
function setup() {
  
  createCanvas(400, 400);

  // fallingObjects = [fallingObjectImg1, fallingObjectImg2]; -> TO-DO: figure out how to make image for fallingObject sprite random (50% chance of each image)
  
  //resize images
  backgroundImg.resize(60, 0);
  catcherImg.resize(80, 0);
  fallingObjectImg1.resize(45, 0);
  fallingObjectImg2.resize(45, 0);
  badFallingObjectImg.resize(45, 0);

  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 370, 80, 50, 'k');
  catcher.color = color(95,158,160);
  
  //Create falling objects
  fallingObject = new Sprite(fallingObjectImg1, 100, 0);
  // fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  //TO-DO: figure out if I can delay the creation of this sprite for a few secs
  badFallingObject = new Sprite(badFallingObjectImg, 100, 0, 35, 40);
  badFallingObject.color = color(0,128,128);
  badFallingObject.vel.y = 2;
  badFallingObject.rotationLock = true;

  //debug
  // allSprites.debug = true;
  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  //set up screen
  background(bgColor);
  if (screen == 0) {
    if (directionsButton.mouse.pressed()) {
      screen = 1;
      directionsScreen();
    }
  }

  if (screen == 1) {
    if (backButton.mouse.pressed()) {
      screen = 0;
      backButton.pos = {x: -900, y: -900};
      homeScreen();
    }
  }

  if (screen == 2) {

    //set up screen
    background(bgColor);
    
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

  }
  // //set up screen
  // background(bgColor);
  // //Draw background image
  // image(backgroundImg, 230, 5);

  // fill(textColor);
  // textSize(12);
  // // Draw directions to screen
  // textAlign('right', 'baseline');
  // text("Move the plate \n with the left and \n right arrow keys \n to catch the taco \n cats and avoid \n the imposters", width-10, 20);

 
  //debug
  // allSprites.debug = mouse.pressing();
}

function restart() {
  if (mouseIsPressed) {
    score = 0;
    catcher.x = 200;
    catcher.y = 370;
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

function homeScreen() {
  background(bgColor);

  fill(textColor);
  textSize(20);
  textAlign(CENTER);
  text("Taco Cat Catcher", width/2, height/2, + 100);

  fill(highScoreColor);
  textSize(12);

  //navigationButtons
  directionsButton = new Sprite(width/2 - 100, height/2 + 50, 100, 70, 'k');
  directionsButton.color = textColor;
  directionsButton.text = "How to Play";
  playButton = new Sprite(width/2 + 100, height/2 + 50, 100, 70, 'k');
  playButton.color = textColor;
  playButton.text = "Play";
}

function directionsScreen() {
  backButton = new Sprite(width/2, height/2, 100, 70, 'k');
  backButton.color = textColor;
  backButton.text = "backButton";
  playButton.pos = {x: -600, y: -600};
  directionsButton.pos = {x: -800, y: -800};
  background(bgColor);
  fill(textColor);
  textSize(12);
  // Draw directions to screen
  textAlign('center');
  text("Move the plate \n with the left and \n right arrow keys \n to catch the taco \n cats and avoid \n the imposters", width/2, height/2);
}

function playScreenAssets() {

}