const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// Update: Canvas size increase (600x600)
canvas.width = 600;
canvas.height = 600;

let box = 30; // Update: Box size thoda bada kiya
let snake = [{x: 10, y: 10}]; 
let apple = {x: 15, y: 15};
let dX = 0, dY = 0;
let score = 0;
let changingDirection = false; // Anti-Double Tap safety

function draw() {
    changingDirection = false; // Reset safety on every frame
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = "#111";
    for(let i=0; i<canvas.width; i+=box) {
        for(let j=0; j<canvas.height; j+=box) {
            ctx.strokeRect(i, j, box, box);
        }
    }

    let newHead = { x: snake[0].x + dX, y: snake[0].y + dY };

    // Boundary Collision (YOU LOSE)
    if (newHead.x < 0 || newHead.x >= canvas.width/box || newHead.y < 0 || newHead.y >= canvas.height/box) {
        alert("GAME OVER! Mummy wins with Score: " + score);
        location.reload();
        return;
    }

    // Self Collision check
    for(let i=1; i<snake.length; i++) {
        if(newHead.x === snake[i].x && newHead.y === snake[i].y) {
            alert("Saanp ne khud ko kaat liya! Game Over.");
            location.reload();
            return;
        }
    }

    if(dX !== 0 || dY !== 0) snake.unshift(newHead);

    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        apple = { x: Math.floor(Math.random()*(canvas.width/box)), y: Math.floor(Math.random()*(canvas.height/box)) };
        if(score >= 5) { alert("CONGRATULATIONS! Mummy won the game!"); location.reload(); }
    } else {
        if(dX !== 0 || dY !== 0) snake.pop();
    }

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x*box, apple.y*box, box, box);

    ctx.fillStyle = "lime";
    snake.forEach(p => ctx.fillRect(p.x*box, p.y*box, box-2, box-2));

    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "14px Courier New";
    ctx.fillText("- BY ANSHU", canvas.width - 100, canvas.height - 20);

    // Update: Speed slowed down to 250ms
    setTimeout(draw, 250); 
}

function setDir(x, y) {
    if (changingDirection) return; // Ignore quick taps
    
    // Prevent 180 degree turns
    if (x === -dX && x !== 0) return;
    if (y === -dY && y !== 0) return;

    dX = x; dY = y;
    changingDirection = true;
}
draw();