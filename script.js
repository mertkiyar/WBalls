const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const ball = {
    x: 100,
    y: 100,
    width: 10,
    height: 10,
    vx: 0,
    vy: 0
}

function update() {


}

function draw() {

}

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}