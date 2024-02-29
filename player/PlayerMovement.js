import input from "../core/Input.js";
import eventManager from "../core/EventManager.js";
import Rock from "../objects/items/Rock.js";

class PlayerMovement {
  constructor(position) {
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.5;
    this.jumps = 0;
    this.maxJumps = 2;
    this.isJumping = false;
    this.lastDirection = "right";
    this.isThrowing = false;
    this.canThrow = true;
    this.isInIdle = false;
  }

  handlePlayerInputs() {
    if (!this.isThrowing) {
      if (input.isActionActive("moveRight")) {
        this.moveRight();
      } else if (input.isActionActive("moveLeft")) {
        this.moveLeft();
      } else if (this.velocity.y > 1) {
        eventManager.emit("Fall");
        this.isInIdle = false;
      } else {
        this.stopHorizontalMovement();
      }

      if (input.wasActionPressed("jump")) {
        if (!this.isJumping && this.jumps < this.maxJumps) {
          if (this.jumps === 1) {
            this.velocity.y = -5;
            eventManager.emit("Jump");
          } else {
            this.velocity.y = -7;
            eventManager.emit("DoubleJump");
          }
          this.jumps++;
          this.isJumping = true;
          this.isInIdle = false;
        }
      } else {
        this.isJumping = false;
      }
    }

    if (input.wasActionPressed("throw")) {
      if (this.canThrow && !this.isThrowing) {
        eventManager.emit("checkThrowRock", this.handleCheckThrowRock.bind(this));
      }
      this.isInIdle = false;
    }
  }

  handleCheckThrowRock(canThrow) {
    if (canThrow) {
      this.isThrowing = true;
      eventManager.emit("Throw");
      setTimeout(() => {
        this.throwRock();
        this.isThrowing = false;
      }, 450);
    }
  }

  moveRight() {
    this.velocity.x = 2.5;
    this.lastDirection = "right";
    this.isInIdle = false;
    if (this.velocity.y <= 1 && this.velocity.y >= 0 && !this.isJumping)
      eventManager.emit("MoveRight");
  }

  moveLeft() {
    this.velocity.x = -2.5;
    this.lastDirection = "left";
    this.isInIdle = false;
    if (this.velocity.y <= 1 && this.velocity.y >= 0 && !this.isJumping)
      eventManager.emit("MoveLeft");
  }

  stopHorizontalMovement() {
    this.velocity.x = 0;
    if (!this.isInIdle) {
      eventManager.emit("Idle");
      this.isInIdle = true;
    }
  }

  throwRock() {
    const direction = this.lastDirection === "right" ? 1 : -1;
    console.log(this.position.x, this.position.y);
    const rock = new Rock({
      position: { x: this.position.x, y: this.position.y },
      state: "collectible",
    });

    rock.makeThrowable(direction);
    eventManager.emit("addGameObject", rock);
  }

  applyGravity() {
    this.velocity.y += this.gravity;
  }

  applyPhysics() {
    this.applyGravity();
    this.handlePlayerInputs();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update() {
    this.applyPhysics();
  }

  updatePosition(newPosition) {
    this.position = newPosition;
  }
}

export default PlayerMovement;
