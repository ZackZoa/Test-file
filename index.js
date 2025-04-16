const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16; // 1024
canvas.height = 64 * 9; // 576

const backgroundLevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: 'img/backgroundLevel1.png',
});

const player = new Player();

// Define blocks (you can add more blocks here)
const blocks = [
  new Block({ position: { x: 300, y: 500 }, width: 100, height: 20 }),
  new Block({ position: { x: 400, y: 350 }, width: 100, height: 20 }),
  new Block({ position: { x: 600, y: 300 }, width: 100, height: 20 }),
  // Add more blocks as needed
];

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

function animate() {
  window.requestAnimationFrame(animate);

  backgroundLevel1.draw();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;

  player.draw();
  player.update();

  // Draw the blocks
  blocks.forEach(block => block.draw());

  // Check for collisions between player and blocks
  checkCollisions(player, blocks);
}

animate();
