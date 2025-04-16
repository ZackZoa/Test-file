function checkCollisions(player, platforms) {
  player.onGround = false; // Reset before checking
  
  platforms.forEach(platform => {
      // Check if player is intersecting with platform
      if (player.position.x < platform.position.x + platform.width &&
          player.position.x + player.width > platform.position.x &&
          player.position.y < platform.position.y + platform.height &&
          player.position.y + player.height > platform.position.y) {
          
          // Calculate overlap on each side
          const bottomOverlap = (player.position.y + player.height) - platform.position.y;
          const topOverlap = (platform.position.y + platform.height) - player.position.y;
          const leftOverlap = (player.position.x + player.width) - platform.position.x;
          const rightOverlap = (platform.position.x + platform.width) - player.position.x;
          
          // Find smallest overlap
          const minOverlap = Math.min(bottomOverlap, topOverlap, leftOverlap, rightOverlap);
          
          // Resolve collision based on smallest overlap
          if (minOverlap === bottomOverlap) {
              // Landing on platform
              player.position.y = platform.position.y - player.height;
              player.velocity.y = 0;
              player.onGround = true;
          } else if (minOverlap === topOverlap) {
              // Hitting head
              player.position.y = platform.position.y + platform.height;
              player.velocity.y = 0;
          } else if (minOverlap === leftOverlap) {
              // Right side collision
              player.position.x = platform.position.x - player.width;
              player.velocity.x = 0;
          } else if (minOverlap === rightOverlap) {
              // Left side collision
              player.position.x = platform.position.x + platform.width;
              player.velocity.x = 0;
          }
      }
  });
}