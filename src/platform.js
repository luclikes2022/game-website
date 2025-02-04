let player;
let terrains = [];
let score = 0;
let lives = 3;
let gameOver = false;
let reload;
let touchj = 0;
let terrain1;
let boss;
let terrainPos = [[250, 200], [400, 300], [50, 250]];
let obsticleArray = []
let cooldown = false;
let cooldownLives = 100

function setup() {
    createCanvas(800, 400);
    player = new Player();
    frameRate(120);
    boss = new Boss(700, 200);
    for (var i = 0; i < terrainPos.length; i++) {
        terrains.push(new terrain(terrainPos[i][0], terrainPos[i][1], terrainPos[i][2]));

    }
    obsticle = new Obsticle(700, 300);
}



function draw() {
    cooldownLives--;




    if (!gameOver) {

        background(255,122,100);
        player.move();
        player.display();
        drawObs();
        boss.display();
        boss.move();

        if (player.getPlayerY() == height) {
            livesMinus();
            player.setPlayerY(50);
            player.setPlayerX(100)
        }

        if (boss.hits(player)) {
            console.log("boss hit");
            livesMinus();
            boss.reverse();
        }

        textSize(32);
        fill(255);
        text("You have " + lives + " lives.", 10, 60);
        text("Your score is " + score, 10, 30);

        if (frameCount % 100 == 0) {
            // obsticleArray.push(new Obsticle(700, random(50, 300)));
            obsticleArray.push(new Obsticle(700, random(50, 300)));
            obsticleArray.push(new Obsticle(700, random(50, 300)));
        }
        for (let i = 0; i < obsticleArray.length; i++) {
            obsticleArray[i].display();
            obsticleArray[i].move();
            if (obsticleArray[i].hits(player) && cooldownLives <= 0) {
                livesMinus();


                console.log("HIT");

                continue;
            }
            if (obsticleArray[i].offscreen()) {
                obsticleArray.splice(i, 1);
                console.log("passed obsticle")
                if (obsticleArray.length % 2 == 0) {
                    score++;
                    console.log(score);

                }
            }
            if (lives <= 0) {
                gameOver = true
            }
        }
    } else {
        textSize(32);
        fill(255);
    console.log(reload);
        if (!reload || reload === undefined) {
            console.log(reload);
            buttonspawn();
        }



    }

    function livesMinus() {
        if (cooldownLives <= 0) {

            lives--;
            cooldownLives = 100
        }
    }

    let touching = false;

    for (var i = 0; i < terrains.length; i++) {
        if (circleRectCollision(player, terrains[i])) {
            player.handleCollision(terrains[i]);
            touching = true;
        }
    }
    if (!touching) {
        player.touchfalse()
    }

    if (gameOver == false) {
        textSize(32);
        fill(255)
        text("You are doing great!", 10, 90);
    } else {
        textSize(32);
        fill(255)
        text("Game over. Sorry!", 10, 90);
    }

}



function drawObs() {
    for (let i = 0; i < terrains.length; i++) {
        terrains[i].display();
    }
}

function restart() {
    score = 0;
    lives = 3;
    terrains = [];
    gameOver = false;
    obsticleArray = [];
    if (reload) {
        reload.remove();
        reload=false;
      

    }
    setup();
}

function buttonspawn() {
    console.log("gameover")
    reload = createButton("Restart");
    reload.position(windowWidth / 2 - reload.elt.offsetWidth, windowHeight / 2);
    reload.mousePressed(restart);
}

function keyPressed() {
    if (key === "w") {
        player.up();
    }
}


class Player {
    constructor() {
        this.x = 50;
        this.y = height / 2;
        this.gravity = 0.45;
        this.lift = -10;
        this.velocityX = 0;
        this.velocityY = 0;
        this.r = 16;
        this.touch = false;
    }

    setPlayerY(y) {
        this.y = y;
    }

    setPlayerX(x) {
        this.x = x;
    }

    touchfalse() {
        this.touch = false;
    }

    getPlayerY() {
        return (this.y);
    }

    display() {


       
            fill(50,139,166);
        


        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    move() {
        // Reset horizontal velocity
        this.velocityX = 0;

        // Check for key presses to update velocity
        if (keyIsDown(65)) { // 'A' key
            this.velocityX = -5;
        } else if (keyIsDown(68)) { // 'D' key
            this.velocityX = 5;
        }

        // Gravity affects vertical velocity
        this.velocityY += this.gravity;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Constrain position
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);


        // If player hits the bottom or top of the canvas
        if (this.y === height) {
            this.velocityY = 0;
        }
        if (this.y === 0) {
            this.velocityY *= -0.5;
        }
    }

    up() {
        console.log(this.touch);
        if (this.touch) {
            this.velocityY += this.lift;
            console.log("touch");
        }
    }

    handleCollision(rect) {
        this.touch = true;
        // Find the closest point on the rectangle to the circle's center
        let closestX = constrain(this.x, rect.x, rect.x + rect.w);
        let closestY = constrain(this.y, rect.y, rect.y + rect.h);

        // Calculate the distance between the circle's center and this closest point
        let distanceX = this.x - closestX;
        let distanceY = this.y - closestY;

        // Calculate the distance
        let distance = sqrt(distanceX * distanceX + distanceY * distanceY);

        // Calculate the overlap
        let overlap = this.r - distance;

        if (overlap > 0) {
            let dx = distanceX / distance;
            let dy = distanceY / distance;

            // Move the circle out of collision
            this.x += dx * overlap;
            this.y += dy * overlap;

            // Adjust velocities
            if (abs(dx) > abs(dy)) {
                this.velocityX = 0;
            } else {
                this.velocityY = 0;
            }
        }
    }
}

class terrain {
    constructor(x, y) {
        this.w = random(50, 200);
        this.h = 15;
        this.x = x;
        this.y = y;
    }

    display() {
        fill(142,15,173);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Boss {
    constructor(x, y) {
        this.w = 200;
        this.h = 200;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.speedY = 5;
        this.bolean = false;
    }

    reverse() {
        this.speed *= -1;
        this.speedY *= -1;
    }

    move() {
        // Bounce off the left and right edges
        if (this.x - this.w / 2 <= 0) {
            this.speed = abs(this.speed); // Ensure speed is positive
        } else if (this.x + this.w / 2 >= width) {
            this.speed = -abs(this.speed); // Ensure speed is negative
        }
        this.x += this.speed;

        // Bounce off the top and bottom edges
        if (this.y - this.h / 2 <= 0) {
            this.speedY = abs(this.speedY); // Ensure speedY is positive
        } else if (this.y + this.h / 2 >= height) {
            this.speedY = -abs(this.speedY); // Ensure speedY is negative
        }
        this.y += this.speedY;
    }

    display() {
        fill(237,142,26);
        ellipse(this.x, this.y, this.w, this.h);

        // Handle size oscillation
        if (this.bolean) {
            this.w += 1;
            this.h += 1;
        } else {
            this.w -= 1;
            this.h -= 1;
        }

        // Clamp size to prevent excessive growth or shrinkage
        this.w = constrain(this.w, 30, 130);
        this.h = constrain(this.h, 30, 130);

        // Toggle oscillation flag based on size
        if (this.w >= 130 || this.h >= 130) {
            this.bolean = false;
        } else if (this.w <= 30 || this.h <= 30) {
            this.bolean = true;
        }
    }

    hits(player) {
        // Player's properties
        const playerRadius = player.r;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = sqrt(dx * dx + dy * dy);
        const bossRadius = (this.w + this.h) / 4;

        if (distance < (playerRadius + bossRadius)) {
            if (abs(dx) > abs(dy)) {
                this.speed *= -1;
                if (dx > 0) {
                    this.x = player.x + playerRadius + bossRadius;
                } else {
                    this.x = player.x - playerRadius - bossRadius;
                }
            } else {
                this.speedY *= -1;

                if (dy > 0) {
                    this.y = player.y + playerRadius + bossRadius;
                } else {
                    this.y = player.y - playerRadius - bossRadius;
                }
            }

            return true;
        }

        return false;
    }
}

function circleRectCollision(circle, rect) {
    // Find the closest point on the rectangle to the circle's center
    let closestX = constrain(circle.x, rect.x, rect.x + rect.w);
    let closestY = constrain(circle.y, rect.y, rect.y + rect.h);

    // Calculate the distance between the circle's center and this closest point
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;

    // Calculate the squared distance
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

    return distanceSquared < (circle.r * circle.r);
}

class Obsticle {
    constructor(x, y) {
        this.w = 70;
        this.h = 30;
        this.x = x;
        this.y = y;
        this.speed = 7;

    }
    display() {
        fill(245,98,45);
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


