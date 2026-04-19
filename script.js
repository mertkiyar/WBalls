const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

let score = 10;
let levelDone = false;
const ball = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    vx: 4,
    vy: 5
}

ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.width > canvas.width || ball.x < 0) {
        ball.vx *= -1;
        score -= 1;
    }

    if (ball.y + ball.width > canvas.height || ball.y < 0) {
        ball.vy *= -1
        score -= 1;
    }

    if (score <= 0) {
        levelDone = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    ctx.font = "190px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.textAlign = "center"; // center horizontal
    ctx.textBaseline = "middle" // center vertical
    ctx.fillText(score, canvas.width / 2, canvas.height / 2);
}

function gameLoop() {
    if (levelDone) return;
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();