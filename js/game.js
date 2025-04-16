// Canvas setup
const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

// Game state
let gameRunning = true;
const player = new Player();

// Platforms - ensure they're wide enough
const platforms = [
    new Block({ position: { x: 0, y: 500 }, width: canvas.width, height: 76 }), // Full-width ground
    new Block({ position: { x: 300, y: 400 }, width: 200, height: 20 }),
    new Block({ position: { x: 600, y: 300 }, width: 200, height: 20 })
];

// Main game loop
function gameLoop() {
    if (!gameRunning) return;
    
    requestAnimationFrame(gameLoop);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw
    player.update();
    platforms.forEach(p => p.draw());
    player.draw();
    
    // Must call collision detection!
    checkCollisions(player, platforms);
}

// Start game
gameLoop();

