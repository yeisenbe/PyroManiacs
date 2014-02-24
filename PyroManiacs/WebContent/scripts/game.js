//Basic Game

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
document.body.appendChild(canvas);

//Load Background
var backgroundReady = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
	backgroundReady = true;
};
backgroundImage.src = "images/background.png";

//Load Pyro
var pyroReady = false;
var pyroImage = new Image();
pyroImage.onload = function () {
	pyroReady = true;
};
pyroImage.src = "images/pyro.png";

//Load Background
var zombieReady = false;
var zombieImage = new Image();
zombieImage.onload = function () {
	zombieReady = true;
};
zombieImage.src = "images/zombie.png";

var pyro = {
		height: 36,
		width: 32,
		speed: 4,
		gravity: 4,
		jumpHeight: 6,
		onGround: false,
		life: 3,
		damage: 1
};
var zombie = {
		height: 36,
		width: 32,
		speed: 2,
		gravity: 4,
		jumpHeight: 6,
		onGround: false,
		life: 2,
		damage: 1
};
var gravity = 3; // pixels per second falling down
var kills = 0;
var coins = 0;

var keysPressed = {};

addEventListener("keydown", function (e) {
	keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysPressed[e.keyCode];
}, false);

//Reset the game to the start state
var reset = function () {
	pyro.x = canvas.width / 2;
	pyro.y = canvas.height - (32 + pyro.height);
	
	zombie.x = 2 * zombie.width;
	zombie.y = canvas.height / 2;
};

var jump = 20;
var zJump = 20;
//Update all of the objects
var update = function (speed) {
	
	//Up arrow
	if (38 in keysPressed && pyro.onGround) {
		pyro.y -= pyro.jumpHeight;
		pyro.onGround = false;
	}
	//Down arrow
	if (40 in keysPressed) {
		pyro.y += pyro.speed;
	}
	//Left arrow
	if (37 in keysPressed) {
		pyro.x -= pyro.speed;
	}
	//Right arrow
	if (39 in keysPressed) {
		pyro.x += pyro.speed;
	}
	
	//Gravity
	if (!pyro.onGround && jump < 20) {
		pyro.y -= pyro.jumpHeight;
		jump++;
	}
	else if	(!pyro.onGround && jump < 22) {
		jump++;
	}
	else {
		pyro.y += pyro.gravity;
	}
	
	//Check collisions
	if (pyro.x < 0 ) { 
		pyro.x = 0; 
	}
	if (pyro.x > canvas.width - pyro.width) { 
		pyro.x = canvas.width - pyro.width;
	}
	if (pyro.y < 0 ) { 
		pyro.y = 0; 
	}
	if (pyro.y > canvas.height - (32 + pyro.height)) { 
		pyro.y = canvas.height - (32 + pyro.height);
		pyro.onGround = true;
		jump = 0;
	}
	
	//Redo it all for the zombie
	//Gravity
	if (!zombie.onGround && zJump < 20) {
		zombie.y -= zombie.jumpHeight;
		zJump++;
	}
	else if	(!zombie.onGround && zJump < 22) {
		zJump++;
	}
	else {
		zombie.y += zombie.gravity;
	}
	
	//Check collisions
	if (zombie.x < 0 ) { 
		zombie.x = 0; 
	}
	if (zombie.x > canvas.width - zombie.width) { 
		zombie.x = canvas.width - zombie.width;
	}
	if (zombie.y < 0 ) { 
		zombie.y = 0; 
	}
	if (zombie.y > canvas.height - (32 + zombie.height)) { 
		zombie.y = canvas.height - (32 + zombie.height);
		zombie.onGround = true;
		zJump = 0;
	}
};

//Draw Screen
var render = function () {
	if (backgroundReady) {
		ctx.drawImage(backgroundImage, 0, 0);
	}
	
	if (pyroReady) {
		ctx.drawImage(pyroImage, pyro.x, pyro.y);
	}
	if (zombieReady) {
		ctx.drawImage(zombieImage, zombie.x, zombie.y);
	}
	
	/*
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Kills: " + kills, 32, 32);
	*/
};

//Main loop
var main = function () {
	var now = Date.now();
	var d = now - start;
	
	update(d / 1000);
	render();
	out.println("Hello World!");
	
	start = now;
};

reset();
var start = Date.now();
setInterval(main, 1);