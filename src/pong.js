const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Colors
        const WHITE = '#FFFFFF';
        const BLACK = '#000000';
        const RED = '#FF0000';

        // Game variables
        const PADDLE_WIDTH = 15;
        const PADDLE_HEIGHT = 100;
        const BALL_SIZE = 15;
        const FPS = 60;

        // Paddle class
        class Paddle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.width = PADDLE_WIDTH;
                this.height = PADDLE_HEIGHT;
                this.speed = 10;
            }

            move(upKey, downKey) {
                if (keys[upKey] && this.y > 0) {
                    this.y -= this.speed;
                }
                if (keys[downKey] && this.y + this.height < canvas.height) {
                    this.y += this.speed;
                }
            }

            draw() {
                ctx.fillStyle = WHITE;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

        // Ball class
        class Ball {
            constructor() {
                this.x = canvas.width / 2 - BALL_SIZE / 2;
                this.y = canvas.height / 2 - BALL_SIZE / 2;
                this.size = BALL_SIZE;
                this.xSpeed = 7 * (Math.random() > 0.5 ? 1 : -1);
                this.ySpeed = (Math.random() > 0.5 ? 1 : -1) * 5;
            }

            move() {
                this.x += this.xSpeed;
                this.y += this.ySpeed;

                if (this.y <= 0 || this.y + this.size >= canvas.height) {
                    this.ySpeed = -this.ySpeed;
                }
            }

            draw() {
                ctx.fillStyle = WHITE;
                ctx.beginPath();
                ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Function to draw text
        function drawText(text, x, y) {
            ctx.fillStyle = WHITE;
            ctx.font = '30px Arial';
            ctx.fillText(text, x, y);
        }

        // Main game loop
        function mainGame(playerType = 2) {
            const player1 = new Paddle(30, canvas.height / 2 - PADDLE_HEIGHT / 2);
            const player2 = new Paddle(canvas.width - 30 - PADDLE_WIDTH, canvas.height / 2 - PADDLE_HEIGHT / 2);
            const ball = new Ball();

            let player1Score = 0;
            let player2Score = 0;

            function gameLoop() {
                // Clear screen
                ctx.fillStyle = BLACK;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Move paddles
                player1.move('w', 's');  // Player 1 controls
                if (playerType === 1) {
                    // Player 2 is controlled by computer
                    if (ball.y > player2.y + player2.height / 2) {
                        player2.y += 4;
                    } else if (ball.y < player2.y + player2.height / 2) {
                        player2.y -= player2.speed;
                    }
                } else {
                    player2.move('ArrowUp', 'ArrowDown');  // Player 2 controls
                }

                // Move ball
                ball.move();

                // Ball collision with paddles
                if (ball.x < player1.x + player1.width && ball.x + ball.size > player1.x && ball.y < player1.y + player1.height && ball.y + ball.size > player1.y) {
                    ball.xSpeed = -ball.xSpeed;
                }
                if (ball.x < player2.x + player2.width && ball.x + ball.size > player2.x && ball.y < player2.y + player2.height && ball.y + ball.size > player2.y) {
                    ball.xSpeed = -ball.xSpeed;
                }

                // Ball out of bounds (scoring)
                if (ball.x <= 0) {
                    player2Score += 1;
                    ball.x = canvas.width / 2 - BALL_SIZE / 2;
                    ball.y = canvas.height / 2 - BALL_SIZE / 2;
                    ball.xSpeed = 7 * (Math.random() > 0.5 ? 1 : -1);
                    ball.ySpeed = (Math.random() > 0.5 ? 1 : -1) * 5;
                }
                if (ball.x + ball.size >= canvas.width) {
                    player1Score += 1;
                    ball.x = canvas.width / 2 - BALL_SIZE / 2;
                    ball.y = canvas.height / 2 - BALL_SIZE / 2;
                    ball.xSpeed = 7 * (Math.random() > 0.5 ? 1 : -1);
                    ball.ySpeed = (Math.random() > 0.5 ? 1 : -1) * 5;
                }

                // Draw paddles and ball
                player1.draw();
                player2.draw();
                ball.draw();

                // Display scores
                drawText(`Player 1: ${player1Score}`, canvas.width / 4 - 50, 40);
                drawText(`Player 2: ${player2Score}`, 3 * canvas.width / 4 - 50, 40);

                requestAnimationFrame(gameLoop);
            }

            gameLoop();
        }

        // Select mode: 1 = Player vs Computer, 2 = Player vs Player
        function selectGameMode() {
            ctx.fillStyle = BLACK;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawText("Select Game Mode:", canvas.width / 3, canvas.height / 3 - 40);
            drawText("1 - Player vs Computer", canvas.width / 3, canvas.height / 3 + 20);
            drawText("2 - Player vs Player", canvas.width / 3, canvas.height / 3 + 60);

            document.addEventListener('keydown', function (event) {
                if (event.key === '1') {
                    mainGame(1);  // Player vs Computer
                }
                if (event.key === '2') {
                    mainGame(2);  // Player vs Player
                }
            });
        }

        const keys = {};
        document.addEventListener('keydown', function (event) {
            keys[event.key] = true;
        });
        document.addEventListener('keyup', function (event) {
            keys[event.key] = false;
        });

        selectGameMode();