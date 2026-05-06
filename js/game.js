export const gameState = {
    currentLevel: parseInt(localStorage.getItem("wballs_level")) || 1,
    score: 0,
    pause: false,
    levelDone: false,
    gameOver: false,
    firstTouch: false,
    debugMode: false,
    soundPlayed: false,
    mouseX: 300, // 600/2
    mouseY: 300, // 600/2
    requestRestart: false,
};