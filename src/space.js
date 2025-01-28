let player;
let obsticals = [];
let score = 0;
let gameOver = false;
let reload;
let touchj = 0;
function setup() {
  createCanvas(800, 400);
  player = new Player(400, 200);
  frameRate(120)
}

function draw() {
  background(0, 255, 212);
  player.update();
  player.display();
}

function clicktap() {
  console.log(touches.length)
  if (touches.length > touchj) {
    player.up();
    touchj = touches.length;
    console.log("clicked!")
  }
  console.log("sandwiches!")
}



function restart() {
  score = 0;
  obsticals = [];
  gameOver = false;
  if (reload) {
    reload.remove();
  }
}
function buttonspawn() {
  reload = createButton("Restart");
  reload.position(windowWidth / 2 - reload.elt.offsetWidth, windowHeight / 2);
  reload.mousePressed(restart);
}

function keyPressed() {

  if (key == "A") {
    player.setRotation(-5);
  } else if (key == "D") {
    player.setRotation(5);
  } else {
    player.setRotation(0);
  }

  if (key == " ") {
    player.boost(true);
  } else {
    player.boost(false);
  }

}
function mousePressed() {
  player.up();
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 15; // Radius of the ship 
    this.heading = 0; // Ship's facing angle (in degrees) 
    this.rotation = 0; // Rotation speed 
    this.dx = 0; // Velocity in x 
    this.dy = 0; // Velocity in y 
    this.isThrusting = false;

  }
  display() {
    fill(142, 97, 213);
    translate(this.x, this.y);
    rotate(radians(this.heading + 90));
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }
  thrust() {
    let angle = radians(this.heading);
    let forceX = cos(angle) * 0.1;
    let forceY = sin(angle) * 0.1;
    this.dx += forceX;
    this.dy += forceY;
  }
  setRotation(angle) {
    this.rotation = angle;
  }
  boost(x) {
    this.isThrusting = x;
  }
  update() {
    this.heading += this.rotation;
    if (this.isThrusting == true) {
      this.thrust();

    }
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= 0.97;
    this.dy *= 0.97;

  }
}

class Obstical {
  constructor(temp, x) {
    this.speed = 6;
    this.w = 20;
    this.h = random(20, 150);
    if (temp) {
      this.x = x;
      this.y = height - this.h;
    } else {
      this.x = x;
      this.y = 0;
    }
  }
  display() {
    fill(18, 277, 215);
    rect(this.x, this.y, this.w, this.h);
  }
  move() {
    this.x -= this.speed;
  }
  hits(player) {
    // Radius of the player's circle
    const playerRadius = 16; // half of the player's diameter (32)

    // Check if the player's right side is beyond the obstacle's left side
    const playerRight = player.x + playerRadius;
    const obstacleLeft = this.x;

    // Check if the player's left side is before the obstacle's right side
    const playerLeft = player.x - playerRadius;
    const obstacleRight = this.x + this.w;

    // Check if the player's bottom side is below the obstacle's top side
    const playerBottom = player.y + playerRadius;
    const obstacleTop = this.y;

    const obstacleBottom = this.y + this.h;
    const playerTop = player.y - playerRadius;

    // Only check vertically because obstacles are at the bottom of the screen

    const collisionHorizontally = playerRight > obstacleLeft && playerLeft < obstacleRight;
    const collisionVertically = playerBottom > obstacleTop && playerTop < obstacleBottom;

    return collisionHorizontally && collisionVertically;
  }

  offscreen() {
    return this.x < this.w;
  }
}
