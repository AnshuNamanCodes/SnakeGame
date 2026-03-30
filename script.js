const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

let box = 20; // Ek square ka size
let snake = [{x: 10, y: 10}]; // Snake starts here
let apple = {x: 15, y: 15};
let dX = 0, dY = 0;
let score = 0;

// Game Loop (Jaise Java mein while loop hota hai)
function draw() {
    // 1. Background Fill
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Grid (Minecraft style background squares)
    ctx.strokeStyle = "#111";
    for(let i=0; i<canvas.width; i+=box) {
        for(let j=0; j<canvas.height; j+=box) {
            ctx.strokeRect(i, j, box, box);
        }
    }

    // 3. Move Snake Head
    let newHead = { x: snake[0].x + dX, y: snake[0].y + dY };

    // 4. Check Boundary (YOU LOSE logic)
    if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
        alert("YOU LOSE! Score: " + score);
        location.reload(); // Restart game
    }

    // 5. Check Apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        apple = { x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20) };
        if(score >= 5) { alert("YOU WIN! 5 Apples Eaten!"); location.reload(); }
    } else {
        if(dX !== 0 || dY !== 0) snake.pop(); // Remove tail if moving
    }

    if(dX !== 0 || dY !== 0) snake.unshift(newHead);

    // 6. Draw Apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x*box, apple.y*box, box, box);

    // 7. Draw Snake
    ctx.fillStyle = "lime";
    snake.forEach(p => ctx.fillRect(p.x*box, p.y*box, box-2, box-2));

    // 8. Watermark - BY ANSHU (Minecraft blocks style)
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "12px Courier New";
    ctx.fillText("- BY ANSHU", 320, 390);

    setTimeout(draw, 150); // Speed control
}

function setDir(x, y) { dX = x; dY = y; }
draw();