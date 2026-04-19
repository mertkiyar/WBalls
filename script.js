const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

const ball = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    vx: 9,
    vy: 5
}
ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x + ball.width > canvas.width || ball.x < 0) {
        ball.vx *= -1;
    }

    if (ball.y + ball.width > canvas.height || ball.y < 0) {
        ball.vy *= -1
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();