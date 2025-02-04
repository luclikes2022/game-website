let player;
let keys = {};
let obsticals = [];
let score = 0;
let gameOver = false;
let reload;
let touchj = 0;
let bulletarray = []
function setup() {
  createCanvas(800, 400);
  player = new Player(400, 200);
  frameRate(120)
}

function draw() {
  background(0, 255, 212);
  player.update();
  player.display();
  player.boundries();
  



  if (keys['a']) {
    player.setRotation(-3);
  } else if (keys['d']) {

    player.setRotation(3);
  } else {
    player.setRotation(0);

  }

  if (keys['e']) {
    bulletarray.push(new bullet(player.heading, player.x, player.y)); 
  }

  if (keys[' ']) {
    player.boost(true);
  } else {
    player.boost(false);

  }



  for (let i = 0; i < bulletarray.length; i++) {
    bulletarray[i].display();
  }




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

function keyPressed() { keys[key.toLowerCase()] = true; }

function keyReleased() { keys[key.toLowerCase()] = false; }


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
    if(this.isThrusting == true){
      fill(255,109,0,)
      triangle(-this.r, -this.r + 30, this.r, -this.r + 30, 0, this.r + 15);
    }
    if (frameCount % 100 == 0) {
      console.log(this.heading);
    }
  }
  thrust() {
    let angle = radians(this.heading);
    let forceX = cos(angle) * 0.1;
    let forceY = sin(angle) * 0.1;
    this.dx += forceX;
    this.dy += forceY;
  }
  setRotation(angle) {
    if (angle == 0) {
      this.rotation *= 0.95;
    } else {
      this.rotation = angle;
    }

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

  boundries() {
    if (this.x >= 801) {
      this.x = 0;
    }

    if (this.x <= -1) {
      this.x = 800;
    }

    if (this.y >= 401) {
      this.y = 0;
    }

    if (this.y <= -1) {
      this.y = 400;
    }
  }
}

class bullet{
constructor(heading, Px, Py){
  this.heading = heading;
  this.x = Px;
  this.y = Py;
  this.lifetime = 360;
  this.h = 0;

  this.dx = cos(this.heading);
  this.dy = sin(this.heading);



}
display(){
  fill(0);
  rect(this.x - 10, this.y, 20, 40);
  rotate(radians(this.heading + 90));
  this.heading = -90;
  this.x += this.dx;
  this.y += this.dy;
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
