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
    vx: 6,
    vy: 4
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
        ball.vx *= 0;
        ball.vy *= 0;
        levelDone = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Ball
    ctx.fillStyle = "lime";
    // ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.beginPath();
    ctx.arc(
        ball.x + ball.width / 2, // center of x
        ball.y + ball.height / 2, // center of y
        ball.width / 2, // radius
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Score
    ctx.font = "190px Helvetica";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.textAlign = "center"; // center horizontal
    ctx.textBaseline = "middle" // center vertical
    ctx.fillText(score, canvas.width / 2, canvas.height / 2);

    //Borders
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width - 300, 10); //top left
    ctx.fillRect(canvas.width, 0, -100, 10); //top right
    ctx.fillRect(0, 0, 10, canvas.height - 400); //left up 
    ctx.fillRect(0, canvas.height, 10, -300); //left down
    ctx.fillRect(canvas.width, 0, -10, canvas.height - 300); //right up
    ctx.fillRect(canvas.width, canvas.height, -10, -100); //right down
    ctx.fillRect(0, canvas.height, canvas.width - 500, -10); //bottom left
    ctx.fillRect(canvas.width, canvas.height, -400, -10); //bottom right
}

function gameLoop() {
    if (levelDone) {
        ball.vx = 0;
        ball.vy = 0;
        ball.x = canvas.width / 2 - ball.width / 2;
        ball.y = canvas.height / 2 - ball.height / 2;
    }
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();