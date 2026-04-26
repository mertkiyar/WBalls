const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

let score = 10;
let levelDone = false;
let gameOver = false;
let firstTouch = false;
let alertShow = false;

const ball = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0,
    speed: 9
}

ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

canvas.addEventListener("click", (e) => {
    if (firstTouch) return;

    let mouseX = e.offsetX; //mouse x axis position(target)
    let mouseY = e.offsetY; //mouse y axis position(target)

    //direction = target pos - current pos
    let dx = mouseX - ball.x; //direction x
    let dy = mouseY - ball.y; //direction y

    let length = Math.sqrt(dx * dx + dy * dy); //pisagor threorem

    ball.vx = (dx / length) * ball.speed;
    ball.vy = (dy / length) * ball.speed;

    firstTouch = true;
});

function update() {
    if (levelDone || gameOver) return;
    ball.x += ball.vx;
    ball.y += ball.vy;

    const ballCenterX = ball.x + ball.width / 2;
    const ballCenterY = ball.y + ball.height / 2;

    // if (ball.x + ball.width > canvas.width || ball.x < 0) {
    //     ball.vx *= -1;
    //     score -= 1;
    // }

    // if (ball.y + ball.width > canvas.height || ball.y < 0) {
    //     ball.vy *= -1
    //     score -= 1;
    // }

    //top wall
    if (ball.y < 0) {
        if (ballCenterX < 300 || ballCenterX > 500) {
            ball.vy *= -1;
            ball.y = 0;
            score -= 1;
        }
    }

    //left wall
    if (ball.x < 0) {
        if (ballCenterY < 200 || ballCenterY > 300) {
            ball.vx *= -1;
            ball.x = 0;
            score -= 1;
        }
    }

    //right wall
    if (ball.x + ball.width > canvas.width) {
        if (ballCenterY < 350 || ballCenterY > 450) {
            ball.vx *= -1;
            ball.x = canvas.width - ball.width;
            score -= 1;
        }
    }

    //bottom wall
    if (ball.y + ball.height > canvas.height) {
        if (ballCenterX < 100 || ballCenterX > 200) {
            ball.vy *= -1
            ball.y = canvas.height - ball.height;
            score -= 1;
        }
    }

    if (ball.x < -20 || ball.x + ball.width / 2 > canvas.width + 20 ||
        ball.y < -20 || ball.y + ball.height / 2 > canvas.height + 20) {
        gameOver = true;
        alert("The ball is in other lands now... forget it!");
    }

    if (score <= 0 && !alertShow) {
        ball.vx *= 0;
        ball.vy *= 0;
        score = 0;
        levelDone = true;
        alertShow = true;
        alert("You did it, you took away the freedom of the ball. Are you happy now?");
        location.reload();
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
    //top
    ctx.fillRect(0, 0, canvas.width - 300, 10); //left
    ctx.fillRect(canvas.width, 0, -100, 10); //right
    //left
    ctx.fillRect(0, 0, 10, canvas.height - 400); //up 
    ctx.fillRect(0, canvas.height, 10, -300); //down
    //right
    ctx.fillRect(canvas.width, 0, -10, canvas.height - 250); //up
    ctx.fillRect(canvas.width, canvas.height, -10, -150); //down
    //bottom
    ctx.fillRect(0, canvas.height, canvas.width - 500, -10); //left
    ctx.fillRect(canvas.width, canvas.height, -400, -10); //right
}

function gameLoop() {
    if (levelDone || gameOver) {
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
