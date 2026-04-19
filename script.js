const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

const ball = {
    x: 100,
    y: 100,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0
}

function update() {

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 2 - ball.height / 2, canvas.height / 2 - ball.height / 2, ball.width, ball.height);
}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();