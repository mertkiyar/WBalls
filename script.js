import { bounceBack, checkCollision } from './js/collisions.js';
import { drawBall, drawDashLine, drawGameOver, drawLevelText, drawScoreText, drawWalls } from './js/renderer.js';
import { LEVELS } from './js/levels.js';

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

let currentLevel = 1;
let scoreOfLevel = [4, 7, 9, 12, 15, 17, 19, 21, 23, 26]; // for now, it has 10 levels
let score = scoreOfLevel[0];

let pause = false;
let levelDone = false;
let gameOver = false;
let firstTouch = false;
let debugMode = false;
let soundPlayed = false;

let showRed;
let showGreen;
let showYellow;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

const ball = {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0,
    speed: 9
}

// sounds
const hitSound = new Audio("sounds/ballHit.wav");
hitSound.preload = "auto";
const gameOverSound = new Audio("sounds/gameOver.wav");
gameOverSound.preload = "auto";
const levelDoneSound = new Audio("sounds/levelDone.wav");
levelDoneSound.preload = "auto";

//end menu (fail and success)
const endGameMenu = document.getElementById("endGameMenu");
const restartBtn = document.getElementById("restartBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");

function startLevel() {
    score = scoreOfLevel[currentLevel - 1];
    ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
    ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

    ball.vx = 0;
    ball.vy = 0;

    firstTouch = false;
    levelDone = false;
    pause = false;
    gameOver = false;
    soundPlayed = false;

    endGameMenu.style.display = "none";
}

startLevel();

canvas.addEventListener("mousemove", (e) => {
    if (!firstTouch) {
        mouseX = e.offsetX; //mouse x axis position(target)
        mouseY = e.offsetY; //mouse y axis position(target)
    }
});

canvas.addEventListener("click", (e) => {
    if (!firstTouch) {
        hitSound.load();
        gameOverSound.load();
        levelDoneSound.load();
    }

    if (firstTouch) return;

    //direction = target pos - current pos
    let dx = mouseX - (ball.x + ball.width / 2); //direction x
    let dy = mouseY - (ball.y + ball.height / 2); //direction y

    let length = Math.sqrt(dx * dx + dy * dy); //pisagor threorem

    if (length > 0) {
        ball.vx = (dx / length) * ball.speed;
        ball.vy = (dy / length) * ball.speed;
    }

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
        startLevel();
    }
});

// press P to pause game
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p") {
        if (firstTouch) {
            pause = !pause;
        }
    }
});

restartBtn.addEventListener("click", () => {
    startLevel();
});

nextLevelBtn.addEventListener("click", () => {
    if (currentLevel < 10) {
        currentLevel++;
        startLevel();
    } else {
        currentLevel = 1;
        startLevel();
    }
});

function playSound(sound) {
    const clone = sound.cloneNode();
    clone.play().catch(error => {
        console.log("The browser stops the sound:", error);
    });
}

function drawDebug() {
    if (!debugMode) return;
    ctx.save();

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(10, 10, 120, 90);

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

    ctx.restore();
}

function update() {
    if (levelDone || gameOver || pause) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    const level = LEVELS[currentLevel - 1];
    const sides = ["top", "left", "right", "bottom"];

    for (const side of sides) {
        const holesOnSide = level.holes.filter(h => h.side === side);
        const result = checkCollision(ball, holesOnSide, side, canvas.width, canvas.height, score);

        if (result.hit) {
            bounceBack(ball, side, canvas.width, canvas.height);
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
            if (currentLevel == 10) {
                nextLevelBtn.innerHTML = "RESET";
            } else {
                nextLevelBtn.innerHTML = "NEXT LEVEL";
            }
            nextLevelBtn.style.display = "block";
        }, 100);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const level = LEVELS[currentLevel - 1];

    drawWalls(ctx, level.holes, score, canvas.width, canvas.height);

    // Level
    drawLevelText(ctx, currentLevel, score, canvas);

    // Score
    drawScoreText(ctx, score, canvas);

    // Dash Line for Ball Direction (it can be circular)
    if (!firstTouch && !gameOver && !levelDone) {
        const ballCenterX = ball.x + ball.width / 2;
        const ballCenterY = ball.y + ball.height / 2;

        drawDashLine(ctx, ballCenterX, ballCenterY, mouseX, mouseY);
    }

    //Ball
    drawBall();

    if (gameOver) {
        drawGameOver(ctx, canvas);
    } else if (levelDone) {
        drawLevelDone(ctx, canvas);
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
