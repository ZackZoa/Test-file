class Player {
  constructor() {
      this.position = { x: 100, y: 100 };
      this.velocity = { x: 0, y: 0 };
      this.width = 50;
      this.height = 80;
      
      // Physics parameters
      this.gravity = 0.8;
      this.maxFallSpeed = 12;
      this.moveSpeed = 5;
      this.airControl = 0.6; // Less control in air
      
      // Jump parameters
      this.jumpForce = -16;
      this.jumpCutMultiplier = 0.5; // Reduce jump when released
      this.coyoteTime = 0.15; // seconds
      this.jumpBufferTime = 0.1; // seconds
      this.maxJumps = 2;
      
      // State variables
      this.jumpsRemaining = this.maxJumps;
      this.lastOnGroundTime = 0;
      this.lastJumpPressedTime = 0;
      this.isJumping = false;
      this.facingRight = true;
  }

  update(deltaTime) {
      // Apply horizontal movement with air control
      const control = this.onGround() ? 1 : this.airControl;
      this.velocity.x = this.moveSpeed * control * (keys.d.pressed - keys.a.pressed);
      
      // Apply gravity with terminal velocity
      this.velocity.y = Math.min(this.velocity.y + this.gravity, this.maxFallSpeed);
      
      // Update position
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      
      // Update timers
      if (this.onGround()) {
          this.lastOnGroundTime = this.coyoteTime;
          this.jumpsRemaining = this.maxJumps;
      } else {
          this.lastOnGroundTime -= deltaTime;
      }
      
      if (keys.jump.pressed) {
          this.lastJumpPressedTime = this.jumpBufferTime;
      } else {
          this.lastJumpPressedTime -= deltaTime;
      }
      
      // Handle jump input
      if (this.canJump() && this.lastJumpPressedTime > 0) {
          this.jump();
      }
      
      // Variable jump height
      if (!keys.jump.pressed && this.velocity.y < 0) {
          this.velocity.y *= this.jumpCutMultiplier;
      }
  }

  onGround() {
      // You'll need to implement this based on your collision system
      // Should return true if player is on ground
      return this.position.y + this.height >= canvas.height || 
             (collisionSystem.isOnGround(this));
  }

  canJump() {
      return (this.lastOnGroundTime > 0 || this.jumpsRemaining > 0) && !this.isJumping;
  }

  jump() {
      this.velocity.y = this.jumpForce;
      this.lastOnGroundTime = 0;
      this.lastJumpPressedTime = 0;
      this.jumpsRemaining--;
      this.isJumping = true;
      
      // Small horizontal boost when jumping
      if (this.velocity.x !== 0) {
          this.velocity.x *= 1.2;
      }
  }
}