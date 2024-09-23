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

        player.move();

        textSize(32);
        text("score: " + (score), 10, 30)
    } else {
        text("game over", 300, 200)
    }
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
    if (key == "w") {
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
        this.x = constrain(this.x, 0, width);
        if (this.y == height) {
            this.velocity = 0;
        }
        if (this.y == 0) {
            this.velocity *= (-0.5);
        }
        if (keyIsDown(65)) {
            this.x -= 5;
        }
        if (keyIsDown(68)) {
            this.x += 5;
        }



    }
    up() {
        this.velocity += this.lift;
        console.log("press");
        console.log(this.velocity);
    }
}

