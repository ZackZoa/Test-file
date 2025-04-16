const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowUp: { pressed: false },
  Space: { pressed: false }
};

window.addEventListener('keydown', (event) => {
  switch (event.key) {
      case 'w':
      case 'ArrowUp':
      case ' ':
          if (!keys[event.key].pressed) {
              player.requestJump();
              keys[event.key].pressed = true;
          }
          break;
      case 'a':
      case 'ArrowLeft':
          keys.a.pressed = true;
          player.velocity.x = -5;
          break;
      case 'd':
      case 'ArrowRight':
          keys.d.pressed = true;
          player.velocity.x = 5;
          break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
      case 'w':
      case 'ArrowUp':
      case ' ':
          keys[event.key].pressed = false;
          // Variable jump height - release to stop jumping
          if (player.velocity.y < -5) { // If still moving upward
              player.velocity.y = -5; // Reduce upward velocity
          }
          break;
      case 'a':
      case 'ArrowLeft':
          keys.a.pressed = false;
          if (!keys.d.pressed) player.velocity.x = 0;
          break;
      case 'd':
      case 'ArrowRight':
          keys.d.pressed = false;
          if (!keys.a.pressed) player.velocity.x = 0;
          break;
  }
});