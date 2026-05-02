export function setupInput(canvas, gameState, ball) {
    canvas.addEventListener("mousemove", (e) => {
        if (!gameState.firstTouch) {
            gameState.mouseX = e.offsetX;
            gameState.mouseY = e.offsetY;
        }
    });

    canvas.addEventListener("click", (e) => {
        if (gameState.firstTouch) return;

        const dx = gameState.mouseX - (ball.x + ball.width / 2);
        const dy = gameState.mouseY - (ball.y + ball.height / 2);
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length > 0) {
            ball.vx = (dx / length) * ball.speed;
            ball.vy = (dy / length) * ball.speed;
        }

        gameState.firstTouch = true;
    });

    document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        if (key === "d") gameState.debugMode = !gameState.debugMode;
        if (key === "r") gameState.requestRestart = true;
        if (key === "p" && gameState.firstTouch) gameState.pause = !gameState.pause;
    });
}
