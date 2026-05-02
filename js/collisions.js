const WALL_THICKNESS = 10; //added as const for code readability

// this codes come from script.js, it is updated version for multiple levels
export function checkCollision(ball, holes, side, canvasWidth, canvasHeight, score) {
    const ballCenterX = ball.x + ball.width / 2;
    const ballCenterY = ball.y + ball.height / 2;

    let touchingWall = false;

    switch (side) {
        case "top":
            touchingWall = ball.y < WALL_THICKNESS;
            break;
        case "left":
            touchingWall = ball.x < WALL_THICKNESS;
            break;
        case "right":
            touchingWall = ball.x + ball.width > canvasWidth - WALL_THICKNESS;
            break;
        case "bottom":
            touchingWall = ball.y + ball.height > canvasHeight - WALL_THICKNESS;
            break;
    }

    if (!touchingWall) return { hit: false, excaped: false };

    // position of ball on along wall
    const posAlongWall = (side === "top" || side === "bottom") ? ballCenterX : ballCenterY;

    for (const hole of holes) {
        if (posAlongWall >= hole.start && posAlongWall <= hole.end) {
            const isClosed = hole.closesAt !== null && score > hole.closesAt;

            if (isClosed) {
                return { hit: true, excaped: false };
            } else {
                return { hit: false, excaped: false };
            }
        }
    }
    return { hit: true, escaped: false };
}

export function bounceBack(ball, side, canvasWidth, canvasHeight) {
    switch (side) {
        case "top":
            ball.vy *= -1;
            ball.y = WALL_THICKNESS;
            break;
        case "left":
            ball.vx *= -1;
            ball.x = WALL_THICKNESS;
            break;
        case "right":
            ball.vx *= -1;
            ball.x = canvasWidth - ball.width - WALL_THICKNESS;
            break;
        case "bottom":
            ball.vy *= -1;
            ball.y = canvasHeight - ball.height - WALL_THICKNESS;
            break;
    }
}