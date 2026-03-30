const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// Gamer Mode Canvas size 
canvas.width = 600;
canvas.height = 600;

let box = 30; 
let snake = [{x: 10, y: 10}]; 
let apple = {x: 15, y: 15};
let dX = 0, dY = 0;
let score = 0;
let changingDirection = false; 

// Sound Effect Load
const eatSound = new Audio('eat.mp3'); 

// Neon Glow Colors
const colors = ["#0ff", "#ff0", "#0f0", "#f00", "#f0f"];
let currentColorIndex = 0;

function draw() {
    changingDirection = false; 
    
    // Background (Deep Black)
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic Grid Glow
    ctx.strokeStyle = "#111";
    for(let i=0; i<canvas.width; i+=box) {
        for(let j=0; j<canvas.height; j+=box) {
            ctx.strokeRect(i, j, box, box);
        }
    }

    let newHead = { x: snake[0].x + dX, y: snake[0].y + dY };

    // Game Over Logic
    if (newHead.x < 0 || newHead.x >= canvas.width/box || newHead.y < 0 || newHead.y >= canvas.height/box) {
        gameOver();
        return;
    }
    for(let i=1; i<snake.length; i++) {
        if(newHead.x === snake[i].x && newHead.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    if(dX !== 0 || dY !== 0) snake.unshift(newHead);

    // Apple Eating Logic
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        
        // PLAY SOUND HERE 🔊
        eatSound.play(); 
        
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        apple = { x: Math.floor(Math.random()*(canvas.width/box)), y: Math.floor(Math.random()*(canvas.height/box)) };
        if(score >= 10) { gameWin(); } // Score target 10 kiya
    } else {
        if(dX !== 0 || dY !== 0) snake.pop();
    }

    // Draw Apple with Red Pulse
    ctx.shadowBlur = 20;
    ctx.shadowColor = "red";
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(apple.x*box + box/2, apple.y*box + box/2, box/2 - 2, 0, Math.PI*2);
    ctx.fill();

    // Draw Glowing Snake
    snake.forEach((p, index) => {
        ctx.shadowBlur = index === 0 ? 25 : 10;
        ctx.shadowColor = colors[currentColorIndex];
        ctx.fillStyle = index === 0 ? colors[currentColorIndex] : "rgba(0, 255, 255, 0.5)";
        ctx.fillRect(p.x*box + 2, p.y*box + 2, box - 4, box - 4);
    });

    // Scoreboard UI
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.font = "bold 25px Orbitron, sans-serif";
    ctx.fillText("SCORE: " + score, 20, 45);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "12px Arial";
    ctx.fillText("DEV: ANSHU NAMAN", canvas.width - 130, canvas.height - 15);

    setTimeout(draw, 120); 
}

function gameOver() {
    alert("BOOM! Game Over. Score: " + score);
    location.reload();
}

function gameWin() {
    ctx.fillStyle = colors[currentColorIndex];
    ctx.font = "bold 60px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("GOD LEVEL!", canvas.width / 2, canvas.height / 2);
    setTimeout(() => { location.reload(); }, 3000);
}

function setDir(x, y) {
    if (changingDirection) return;
    if (x === -dX && x !== 0) return;
    if (y === -dY && y !== 0) return;
    dX = x; dY = y;
    changingDirection = true;
}
draw();