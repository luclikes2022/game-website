let player;
let terrains = [];
let score = 0;
let gameOver = false;
let reload;
let touchj = 0;
let terrain1;
let boss;
let terrainPos = [[250, 200], [400, 300], [50, 250]];
let obsticleArray = []

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
    // console.log(player.getPlayerY())
    if (player.getPlayerY() == 400 && gameOver == false) {
        gameOver = true;
        buttonspawn();
    }
    if (!gameOver) {
        background(5);
        player.move();
        player.display();
        drawObs();
        boss.display();
        boss.move();



        textSize(32);
        fill(255);
        text("score: " + score, 10, 30);
        if (frameCount % 100 == 0) {
            obsticleArray.push(new Obsticle(700, random(50, 300)));
            obsticleArray.push(new Obsticle(700, random(50, 300)));
            obsticleArray.push(new Obsticle(700, random(50, 300)));
        }
        for (let i = 0; i < obsticleArray.length; i++) {
            obsticleArray[i].display();
            obsticleArray[i].move();
            if (obsticleArray[i].hits(player)) {
                gameOver = true
                console.log("HIT");
                buttonspawn();
                continue;
            }
            if (obsticleArray[i].offscreen()) {
                obsticleArray.splice(i, 1);
                console.log("passed obsticle")
                if (obsticleArray.length % 2 == 0) {
                    score++;
                    console.log(score)

                }
            }
        }
    } else {
        textSize(32);
        fill(255);
        text("game over", 300, 200);

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
}

function drawObs() {
    for (let i = 0; i < terrains.length; i++) {
        terrains[i].display();
    }
}

function restart() {
    score = 0;
    terrains = [];
    gameOver = false;
    obsticleArray = []
    if (reload) {
        reload.remove();
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

    touchfalse() {
        this.touch = false;
    }

    getPlayerY() {
        return (this.y);
    }

    display() {
        fill(255);
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
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Boss {
    constructor(x, y) {
        this.w = 50;
        this.h = 30;
        this.x = x;
        this.y = y;
        this.speed = 5;
    }

    move() {
        if (this.x - this.w / 2 <= 0) {
            this.speed = 5;
        } else if (this.x + this.width / 2 >= 800) {
            this.speed = -5;
        }
        this.x -= this.speed;
    }

    display() {
        fill(255);
        ellipse(this.x, this.y, this.w, this.h);
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


