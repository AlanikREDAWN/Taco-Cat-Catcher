//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
//sprites
let catcher, fallingObject, badFallingObject;
let playButton, directionsButton, backButton;
//ints
let score = 0;
let highScore = 0;
let screen = 0;
var time;
var wait = 2000;
let lives = 3;
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
  // backgroundImg = loadImage('assets/burritoCat.gif');
  backgroundImg = loadImage('assets/burritoCat.png');
  // catcherImg = loadImage("assets/plate.gif");
  catcherImg = loadImage('assets/plate.png');
  // fallingObjectImg1 = loadImage("assets/tacoCat1.gif");
  fallingObjectImg1 = loadImage('assets/tacoCat1.png');
  // fallingObjectImg2 = loadImage("assets/tacoCat2.gif");
  fallingObjectImg2 = loadImage('assets/tacoCat2.png');
  // badFallingObjectImg = loadImage("assets/pugBurger.gif");
   badFallingObjectImg = loadImage('assets/pugBurger.png');
  heartImg = loadImage('assets/health.png');
}

/* SETUP RUNS ONCE */
function setup() {
  
  createCanvas(400, 400);

  time = millis();
  // fallingObjects = [fallingObjectImg1, fallingObjectImg2]; -> TO-DO: figure out how to make image for fallingObject sprite random (50% chance of each image)
  
  //resize images
  // backgroundImg.resize(60, 0);
  // catcherImg.resize(80, 0);
  // fallingObjectImg1.resize(45, 0);
  // fallingObjectImg2.resize(45, 0);
  // badFallingObjectImg.resize(45, 0);

  //debug
  allSprites.debug = true;
  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  //set up screen
  // background(bgColor);
  if (screen == 0) {
    if (directionsButton.mouse.pressed()) {
      screen = 1;
      directionsScreen();
    } else if (playButton.mouse.pressed()) {
      screen = 2;

      playScreenAssets()
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
    
    //Draw background image
    image(backgroundImg, 330, 5, 60, 79.711);

    //draw lives
    image(heartImg, 140, 5, 50, 39.808);
    image(heartImg, 200, 5, 50, 39.808);
    image(heartImg, 260, 5, 50, 39.808);

    if (fallingObject.img == fallingObjectImg1) {
      fallingObject.img.scale = 0.0223;
    } else if (fallingObject.img == fallingObjectImg2) {
      fallingObject.img.scale = 0.088;
    }
    
    //If fallingObject reaches bottom, move back to random position at top
    if (fallingObject.y >= height) {
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(1, 5);
      // score -= 1;
      lives -= 1;
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
      // score -= 1;
      lives -= 1;
    }

    if (fallingObject.collides(badFallingObject)) {
      fallingObject.direction = 'down';
      badFallingObject.direction = 'down';
      print('down');
    }

    //Display score
    textAlign('left', 'bottom');
    textStyle('bold');
    textSize(16);
    fill(textColor);
    text('Score: ' + score, 10, 25);

    if (score >= highScore && score != 0) {
      fill(highScoreColor);
      highScore = score; 
    } else {
      fill(textColor);
    }

    if (fallingObject.collides(badFallingObject)) {
      fallingObject.direction = 'down';
      badFallingObject.direction = 'down';
      print('down');
    }
    
    text('High Score: ' + highScore, 10, 45);

    text('Lives: ' + lives, 10, 65);

    //Create lose state
    if (lives < 1) {
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

      text('Your score:\n'+ score, width/2 - 100, height/2 + 90)

      text('Your high score:\n'+ highScore, width/2 + 100, height/2 + 90)
      restart();
    }

    youWin();

  }
  // //set up screen
  // background(bgColor);
  // //Draw background image
  // image(backgroundImg, 280, 5);

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
    lives = 3;
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
  textSize(40);
  textStyle('bold');
  textAlign(CENTER);
  stroke(highScoreColor);
  strokeWeight(2);
  text("Taco Cat Catcher", width/2, height/2 - 80);

  textStyle('normal');
  noStroke();
  
  //navigationButtons
  directionsButton = new Sprite(width/2 - 100, height/2 + 50, 100, 70, 'k');
  directionsButton.color = textColor;
  directionsButton.text = "How to Play";
  directionsButton.textSize = 16;
  directionsButton.textColor = highScoreColor;
  directionsButton.stroke = highScoreColor;
  directionsButton.strokeWeight = 3;
  
  playButton = new Sprite(width/2 + 100, height/2 + 50, 100, 70, 'k');
  playButton.color = textColor;
  playButton.text = "Play";
  playButton.textSize = 16;
  playButton.textColor = highScoreColor;
  playButton.stroke = highScoreColor;
  playButton.strokeWeight = 3;
}

function directionsScreen() {
  background(bgColor);
  playButton.pos = {x: -600, y: -600};
  directionsButton.pos = {x: -800, y: -800};
  
  backButton = new Sprite(width/2, height/2 + 80, 100, 70, 'k');
  backButton.color = textColor;
  backButton.text = "Home";
  backButton.textSize = 16;
  backButton.textColor = highScoreColor;
  backButton.stroke = highScoreColor;
  backButton.strokeWeight = 3;

  fill(textColor);
  stroke(highScoreColor);
  strokeWeight(2);
  textSize(40);
  textStyle('bold');
  textAlign(CENTER);
  text("How to Play", width/2, height/2 - 100);

  textStyle('normal');
  noStroke();
  
  // Draw directions to screen
  rectMode(CENTER);
  fill(textColor);
  textSize(18);
  textAlign(CENTER);
  text("Move the plate with the left and right arrow keys to catch the taco cats and avoid the imposters", width/2, height/2 - 20, 300, 100);
}

function playScreenAssets() {
  playButton.pos = {x: -600, y: -600};
  directionsButton.pos = {x: -800, y: -800};

  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 370, 80, 50, 'k');
  catcher.color = color(95,158,160);
  catcher.img.scale = 0.1563;

  //Create falling objects
  fallingObject = new Sprite(fallingObjectImg1, 100, 0, 45, 42);
  // fallingObject.color = color(0,128,128);
  // fallingObject.img.scale = 0.0223;
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  //TO-DO: figure out if I can delay the creation of this sprite for a few secs
  badFallingObject = new Sprite(badFallingObjectImg, 150, 0, 35, 40);
  badFallingObject.color = color(0,128,128);
  badFallingObject.img.scale = 0.09;
  badFallingObject.vel.y = 2;
  badFallingObject.rotationLock = true;
  // badFallingObject.collider = 'k';

  if(millis() - time >= wait){
    console.log(wait, "ms passed");
    //if it is, do something
    
    // badFallingObject.vel.y = 2;
      
    //also update the stored time
    time = millis();
  }
  

}

