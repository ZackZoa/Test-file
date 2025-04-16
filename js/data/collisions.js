class Block {
    constructor({ position, width, height }) {
      this.position = position;
      this.width = width;
      this.height = height;
    }
  
    draw() {
      c.fillStyle = 'yellow';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  
  // Collision detection function with refined logic
  function checkCollisions(player, blocks) {
    blocks.forEach(block => {
      // Check for horizontal (left or right) collisions
      if (
        player.position.x + player.width > block.position.x &&
        player.position.x < block.position.x + block.width &&
        player.position.y + player.height > block.position.y &&
        player.position.y < block.position.y + block.height
      ) {
        // Handle vertical collisions (falling or jumping)
        if (player.velocity.y > 0) { // Player is falling
          if (player.position.y + player.height <= block.position.y) {
            // Prevent falling through the block
            player.velocity.y = 0;
            player.position.y = block.position.y - player.height; // Place player on top of the block
          }
        } else if (player.velocity.y < 0) { // Player is jumping
          if (player.position.y >= block.position.y + block.height) {
            // Prevent jumping through the block
            player.velocity.y = 0;
            player.position.y = block.position.y + block.height; // Place player below the block
          }
        }
  
        // Handle horizontal collisions (left or right)
        if (player.velocity.x > 0) { // Moving right
          if (player.position.x + player.width > block.position.x &&
            player.position.x < block.position.x + block.width) {
            // Stop the player's movement to the right
            player.velocity.x = 0;
            player.position.x = block.position.x - player.width; // Place player to the left of the block
          }
        } else if (player.velocity.x < 0) { // Moving left
          if (player.position.x < block.position.x + block.width &&
            player.position.x + player.width > block.position.x) {
            // Stop the player's movement to the left
            player.velocity.x = 0;
            player.position.x = block.position.x + block.width; // Place player to the right of the block
          }
        }
      }
    });
  }
  