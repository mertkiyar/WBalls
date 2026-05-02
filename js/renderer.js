const WALL_THICKNESS = 10;

export function drawWalls(ctx, holes, score, canvasWidth, canvasHeight) {
    const sides = ["top", "left", "right", "bottom"];

    for (const side of sides) {
        const sideHoles = holes.filter(h => h.side === side);
        const edgeLenght = (side === "top" || side === "bottom") ? canvasWidth : canvasHeight;

        const segments = getWallSegments(sideHoles, edgeLenght, score);

        for (const segment of segments) {
            ctx.fillStyle = segment.color;
            const rect = segmentToRect(segment, side, canvasWidth, canvasHeight);
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    }
}

export function drawLevelText(ctx, currentLevel, score, canvas) {
    ctx.font = "30px Iceberg";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("LEVEL " + currentLevel, canvas.width / 2, canvas.height / 2 - 150);
}

export function drawScoreText(ctx, score, canvas) {
    ctx.font = "250px Helvetica";
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.textAlign = "center"; // center horizontal
    ctx.textBaseline = "middle" // center vertical
    ctx.fillText(score, canvas.width / 2, canvas.height / 2);
}

export function drawDashLine(ctx, ballCenterX, ballCenterY, mouseX, mouseY) {
    if (Math.abs(mouseX - ballCenterX) < 120 && Math.abs(mouseY - ballCenterY) < 120) {
        ctx.beginPath();
        ctx.moveTo(ballCenterX, ballCenterY);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
    }
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fill();
}

export function drawBall(ctx, ball) {
    ctx.fillStyle = "tomato";
    ctx.beginPath();
    ctx.arc(
        ball.x + ball.width / 2, // center of x
        ball.y + ball.height / 2, // center of y
        ball.width / 2, // radius
        0,
        Math.PI * 2
    );
    ctx.fill();
}

export function drawGameOver(ctx, canvas) {
    ctx.fillStyle = "rgba(100, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "tomato";
    ctx.font = "bold 40px Iceberg";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

    ctx.fillStyle = "white";
    ctx.font = "20px Iceberg";
    ctx.fillText("The ball is in other lands now...", canvas.width / 2, canvas.height / 2 + 10);
}

export function drawLevelDone(ctx, canvas) {
    ctx.fillStyle = "rgba(0, 50, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gold";
    ctx.font = "bold 40px Iceberg";
    ctx.fillText("LEVEL CLEARED", canvas.width / 2, canvas.height / 2 - 40);

    ctx.fillStyle = "white";
    ctx.font = "20px Iceberg";
    ctx.fillText("You took away the freedom of the ball.", canvas.width / 2, canvas.height / 2 + 10);
}

function getWallSegments(holes, edgeLenght, score) {
    const sorted = [...holes].sort((a, b) => a.start - b.start);
    const segments = [];
    let cursor = 0;

    for (const hole of sorted) {
        // wall to first hole drawing
        if (cursor < hole.start) {
            segments.push({
                from: cursor,
                to: hole.start,
                color: "white"
            });
        }

        //hole drawing
        const isClosed = hole.closesAt !== null && score > hole.closesAt;
        if (isClosed && hole.color) {
            segments.push({
                from: hole.start,
                to: hole.end,
                color: hole.color
            });
        }

        cursor = hole.end;
    }
    // last hole to wall drawing
    if (cursor < edgeLenght) {
        segments.push({
            from: cursor,
            to: edgeLenght,
            color: "white"
        });
    }
    return segments;
}
// converts a segment to rect coord on the canvas
function segmentToRect(segment, side, canvasWidth, canvasHeight) {
    switch (side) {
        case "top":
            return { x: segment.from, y: 0, width: segment.to - segment.from, height: WALL_THICKNESS };
        case "left":
            return { x: 0, y: segment.from, width: WALL_THICKNESS, height: segment.to - segment.from };
        case "right":
            return { x: canvasWidth - WALL_THICKNESS, y: segment.from, width: WALL_THICKNESS, height: segment.to - segment.from };
        case "bottom":
            return { x: segment.from, y: canvasHeight - WALL_THICKNESS, width: segment.to - segment.from, height: WALL_THICKNESS };
    }
}