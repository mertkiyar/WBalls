import { bounceBack, checkCollision } from './js/collisions.js';
import { drawBall, drawDashLine, drawGameOver, drawLevelDone, drawLevelText, drawScoreText, drawWalls } from './js/renderer.js';
import { LEVELS } from './js/levels.js';
import { setupInput } from './js/input.js';
import { gameState } from './js/game.js';

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 600;

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

restartBtn.addEventListener("click", () => {
    startLevel();
});

nextLevelBtn.addEventListener("click", () => {
    if (gameState.currentLevel < 10) {
        gameState.currentLevel++;
        startLevel();
    } else {
        gameState.currentLevel = 1;
        startLevel();
    }
});

function startLevel() {
    const level = LEVELS[gameState.currentLevel - 1];

    gameState.score = level.score;
    ball.x = canvas.width / 2 - ball.width / 2; // center on x axis 
    ball.y = canvas.height / 2 - ball.height / 2; // center on y axis

    ball.vx = 0;
    ball.vy = 0;

    gameState.firstTouch = false;
    gameState.levelDone = false;
    gameState.pause = false;
    gameState.gameOver = false;
    gameState.soundPlayed = false;

    endGameMenu.style.display = "none";
}

setupInput(canvas, gameState, ball);

function playSound(sound) {
    const clone = sound.cloneNode();
    clone.play().catch(error => {
        console.log("The browser stops the sound:", error);
    });
}

function drawDebug() {
    if (!gameState.debugMode) return;
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
    if (gameState.levelDone || gameState.gameOver || gameState.pause) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    const level = LEVELS[gameState.currentLevel - 1];
    const sides = ["top", "left", "right", "bottom"];

    for (const side of sides) {
        const holesOnSide = level.holes.filter(h => h.side === side);
        const result = checkCollision(ball, holesOnSide, side, canvas.width, canvas.height, gameState.score);

        if (result.hit) {
            bounceBack(ball, side, canvas.width, canvas.height);
            playSound(hitSound);
            gameState.score -= 1;
        }
    }

    if (ball.x < -20 || ball.x + ball.width / 2 > canvas.width + 20 ||
        ball.y < -20 || ball.y + ball.height / 2 > canvas.height + 20) {
        gameState.gameOver = true;
        playSound(gameOverSound);

        endGameMenu.style.display = "flex";
        nextLevelBtn.style.display = "none";
    }

    if (gameState.score <= 0 && !gameState.soundPlayed) {
        gameState.soundPlayed = true;
        gameState.levelDone = true;
        setTimeout(() => {
            playSound(levelDoneSound);
            ball.vx *= 0;
            ball.vy *= 0;

            endGameMenu.style.display = "flex";
            if (gameState.currentLevel == 10) {
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

    const level = LEVELS[gameState.currentLevel - 1];

    drawWalls(ctx, level.holes, gameState.score, canvas.width, canvas.height);

    // Level
    drawLevelText(ctx, gameState.currentLevel, gameState.score, canvas);

    // Score
    drawScoreText(ctx, gameState.score, canvas);

    // Dash Line for Ball Direction (it can be circular)
    if (!gameState.firstTouch && !gameState.gameOver && !gameState.levelDone) {
        const ballCenterX = ball.x + ball.width / 2;
        const ballCenterY = ball.y + ball.height / 2;

        drawDashLine(ctx, ballCenterX, ballCenterY, gameState.mouseX, gameState.mouseY);
    }

    //Ball
    drawBall(ctx, ball);

    if (gameState.gameOver) {
        drawGameOver(ctx, canvas);
    } else if (gameState.levelDone) {
        drawLevelDone(ctx, canvas);
    }

    drawDebug();
}

function gameLoop() {
    if (gameState.levelDone || gameState.gameOver) {
        ball.vx = 0;
        ball.vy = 0;
        if (!gameState.debugMode) {
            ball.x = canvas.width / 2 - ball.width / 2;
            ball.y = canvas.height / 2 - ball.height / 2;
        }
    }
    if (gameState.requestRestart) {
        gameState.requestRestart = false;
        startLevel();
    }
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

startLevel();
gameLoop();
