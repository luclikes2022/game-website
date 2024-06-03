let player;
let obsticals = [];
let score = 0;
let gameOver = false;

function setup(){
  createCanvas(800, 400);
  player= new Player();
  frameRate(120)
}

function draw(){
  if(gameOver == false){
    background(5);
    player.display();
    fill(0);
    // keyPress();
    player.move();
    if(frameCount % 100 == 0){
      obsticals.push(new Obstical());
    }
    for(let i = 0; i < obsticals.length; i++){
      obsticals[i].display();
      obsticals[i].move();
      if(obsticals[i].hits(player)){
        gameOver=true
        console.log("HIT");
      }
      if(obsticals[i].offscreen()){
        obsticals.splice(i,1);
        score++;
      }
    }
    textSize(32);
    text("score: "+score, 10,30)
  }
}

function keyPressed(){
  if(key == "w"){
    player.up();

  }
}

class Player{
  constructor(){
    this.x = 50;
    this.y = height/2;
    this.gravity = 0.45;
    this.lift = -10;
    this.velocity = 0;
  }
  display(){
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }
  move(){
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height);
    if(this.y == height){
      this.velocity=0;
    }
    if(this.y==0){
      this.velocity*=(-0.5)
    }
  }
  up(){
    this.velocity += this.lift;
        console.log("press")
        console.log(this.velocity)
  }
}

class Obstical{
  constructor(){
    this.speed = 6;
    this.w = 20;
    this.h = random(20, 200);
    this.x = width;
    this.y = height-this.h;
  }
  display(){
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  move(){
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

// Only check vertically because obstacles are at the bottom of the screen
const collisionHorizontally = playerRight > obstacleLeft && playerLeft < obstacleRight;
const collisionVertically = playerBottom > obstacleTop;

return collisionHorizontally && collisionVertically;
}

  offscreen(){
    return this.x < this.w;
  }
}