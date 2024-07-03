// let monster;

// function setup() {
// 	new Canvas(500, 120);

// 	monster = new Sprite();
// 	monster.diameter = 70;
// 	monster.image = 'assets/monster.png';
// 	monster.image.offset.y = 6;
// }

// function draw() {
// 	clear();
// 	monster.debug = mouse.pressing();
// }

function setup() {
	new Canvas(500, 200);

	let flipper = new Sprite(250, 100, 200, 20, 'k');
	flipper.debug = true;
	flipper.rotationSpeed = 1;
	flipper.offset = 40;
}

function draw() {
	clear();
	if (mouse.presses()) new Sprite(mouse.x, mouse.y, 10);
}