let player;
let obsticals = [];
let score = 0;
let gameOver = false;
let reload;
let touchj = 0;
function setup() {
  createCanvas(800, 400);
  player = new Player();
  frameRate(120)
}

function draw() {
  if (gameOver == false) {
    background(5);
    player.display();
    fill(0);
    clicktap();
    // keyPress();
    player.move();
    if (frameCount % 100 == 0) {
      let x = width
      obsticals.push(new Obstical(false, x));
      obsticals.push(new Obstical(true, x));
    }
    for (let i = 0; i < obsticals.length; i++) {
      obsticals[i].display();
      obsticals[i].move();
      if (obsticals[i].hits(player)) {
        gameOver = true
        console.log("HIT");
        buttonspawn();
        continue;
      }
      if (obsticals[i].offscreen()) {
        obsticals.splice(i, 1);
        console.log("passed obsticle")
        if (obsticals.length % 2 == 0) {
          score++;
          console.log(score)

        }
      }
    }
    textSize(32);
    text("score: " + (score), 10, 30)
  } else {
    text("game over", 300, 200)
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

function keyPressed() {
  if (key == " ") {
    player.up();

  }
}
function mousePressed() {
  player.up();
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.gravity = 0.45;
    this.lift = -10;
    this.velocity = 0;
  }
  display() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }
  move() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height);
    if (this.y == height) {
      this.velocity = 0;
    }
    if (this.y == 0) {
      this.velocity *= (-0.5)
    }
  }
  up() {
    this.velocity += this.lift;
    console.log("press")
    console.log(this.velocity)
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
    fill(255);
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

