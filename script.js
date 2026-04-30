const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

let score = 10;
let pause = false;
let levelDone = false;
let gameOver = false;
let firstTouch = false;
let debugMode = false;
let showRed;
let showGreen;
let showYellow;
let soundPlayed = false;

const ball = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0,
    speed: 9
}

const hitSound = new Audio("sounds/ballHit.wav");
hitSound.preload = "auto";
const gameOverSound = new Audio("sounds/gameOver.wav");
gameOverSound.preload = "auto";
const levelDoneSound = new Audio("sounds/levelDone.wav");
levelDoneSound.preload = "auto";
const endGameMenu = document.getElementById("endGameMenu");
const restartBtn = document.getElementById("restartBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");

ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

canvas.addEventListener("click", (e) => {
    if (!firstTouch) {
        hitSound.load();
        gameOverSound.load();
        levelDoneSound.load();
    }

    if (firstTouch) return;

    let mouseX = e.offsetX; //mouse x axis position(target)
    let mouseY = e.offsetY; //mouse y axis position(target)

    //direction = target pos - current pos
    let dx = mouseX - (ball.x + ball.width / 2); //direction x
    let dy = mouseY - (ball.y + ball.height / 2); //direction y

    let length = Math.sqrt(dx * dx + dy * dy); //pisagor threorem

    ball.vx = (dx / length) * ball.speed;
    ball.vy = (dy / length) * ball.speed;

    firstTouch = true;
});

//if d key pressed, opens debug mode.
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "d") {
        debugMode = !debugMode;
    }
});
// press R to try again
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") {
        location.reload();
    }
});

// press P to pause game
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p") {
        pause = !pause;
    }
});

restartBtn.addEventListener("click", () => {
    location.reload();
});

nextLevelBtn.addEventListener("click", () => {
    alert("coming soon!");
});
function playSound(sound) {
    const clone = sound.cloneNode();
    clone.play().catch(error => {
        console.log("The browser stops the sound:", error);
    });
}

function drawDebug() {
    if (!debugMode) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 10, 180, 90);

    ctx.fillStyle = "lime";
    ctx.font = "14px Monospace";
    ctx.textAlign = "left";

    ctx.fillText(`X: ${ball.x.toFixed(2)}`, 20, 30);
    ctx.fillText(`Y: ${ball.y.toFixed(2)}`, 20, 50);
    ctx.fillText(`VX: ${ball.vx.toFixed(2)}`, 20, 70);
    ctx.fillText(`VY: ${ball.vy.toFixed(2)}`, 20, 90);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.strokeRect(ball.x, ball.y, ball.width, ball.height);
}

function update() {
    if (levelDone || gameOver || pause) return;

    showRed = score > 6;
    showGreen = score > 4;
    showYellow = score > 2;

    ball.x += ball.vx;
    ball.y += ball.vy;

    const ballCenterX = ball.x + ball.width / 2;
    const ballCenterY = ball.y + ball.height / 2;

    //top wall
    if (ball.y < 10) {
        if (ballCenterX < 300 || ballCenterX > 500) {
            ball.vy *= -1;
            ball.y = 10;
            playSound(hitSound);
            score -= 1;
        }
    }

    //left wall
    if (ball.x < 10) {
        if (ballCenterY < 200 || ballCenterY > 300) {
            ball.vx *= -1;
            ball.x = 10;
            playSound(hitSound);
            score -= 1;
        } else if (showRed) {
            ball.vx *= -1;
            ball.x = 10;
            playSound(hitSound);
            score -= 1;
        }
    }

    //right wall
    if (ball.x + ball.width > canvas.width - 10) {
        if (ballCenterY < 350 || ballCenterY > 450) {
            ball.vx *= -1;
            ball.x = canvas.width - ball.width - 10;
            playSound(hitSound);
            score -= 1;
        } else if (showYellow) {
            ball.vx *= -1;
            ball.x = canvas.width - ball.width - 10;
            playSound(hitSound);
            score -= 1;
        }
    }

    //bottom wall
    if (ball.y + ball.height > canvas.height - 10) {
        if (ballCenterX < 100 || ballCenterX > 200) {
            ball.vy *= -1
            ball.y = canvas.height - ball.height - 10;
            playSound(hitSound);
            score -= 1;
        } else if (showGreen) {
            ball.vy *= -1
            ball.y = canvas.height - ball.height - 10;
            playSound(hitSound);
            score -= 1;
        }
    }

    if (ball.x < -20 || ball.x + ball.width / 2 > canvas.width + 20 ||
        ball.y < -20 || ball.y + ball.height / 2 > canvas.height + 20) {
        gameOver = true;
        playSound(gameOverSound);

        endGameMenu.style.display = "flex";
        nextLevelBtn.style.display = "none";
    }

    if (score <= 0 && !soundPlayed) {
        soundPlayed = true;
        levelDone = true;
        setTimeout(() => {
            playSound(levelDoneSound);
            ball.vx *= 0;
            ball.vy *= 0;

            endGameMenu.style.display = "flex";
            nextLevelBtn.style.display = "block";
        }, 100);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Ball
    ctx.fillStyle = "lime";
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

    //Borders (no collision)
    ctx.fillStyle = "white";
    //top
    ctx.fillRect(0, 0, canvas.width - 300, 10); //left
    ctx.fillRect(canvas.width, 0, -100, 10); //right
    //left
    ctx.fillRect(0, 0, 10, canvas.height - 400); //up 
    if (showRed) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, canvas.height - 400, 10, 100);//mid
        ctx.fillStyle = "white";
    }
    ctx.fillRect(0, canvas.height, 10, -300); //down
    //right
    ctx.fillRect(canvas.width, 0, -10, canvas.height - 250); //up
    if (showYellow) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(canvas.width, canvas.height - 250, -10, 100); //mid    
        ctx.fillStyle = "white";
    }
    ctx.fillRect(canvas.width, canvas.height, -10, -150); //down
    //bottom
    ctx.fillRect(0, canvas.height, canvas.width - 500, -10); //left
    if (showGreen) {
        ctx.fillStyle = "lime";
        ctx.fillRect(canvas.width - 500, canvas.height, 100, -10); //mid
        ctx.fillStyle = "white";
    }
    ctx.fillRect(canvas.width, canvas.height, -400, -10); //right

    if (gameOver) {
        ctx.fillStyle = "rgba(100, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "tomato";
        ctx.font = "bold 40px Iceberg";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = "white";
        ctx.font = "20px Iceberg";
        ctx.fillText("The ball is in other lands now...", canvas.width / 2, canvas.height / 2 + 10);

    } else if (levelDone) {
        ctx.fillStyle = "rgba(0, 50, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "gold";
        ctx.font = "bold 40px Iceberg";
        ctx.fillText("LEVEL CLEARED", canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = "white";
        ctx.font = "20px Iceberg";
        ctx.fillText("You took away the freedom of the ball.", canvas.width / 2, canvas.height / 2 + 10);
    }

    drawDebug();
}

function gameLoop() {
    if (levelDone || gameOver) {
        ball.vx = 0;
        ball.vy = 0;
        if (!debugMode) {
            ball.x = canvas.width / 2 - ball.width / 2;
            ball.y = canvas.height / 2 - ball.height / 2;
        }
    }
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
