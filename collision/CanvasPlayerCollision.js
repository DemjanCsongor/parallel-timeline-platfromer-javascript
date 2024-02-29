class CanvasPlayerCollision {
  static LEFT_SIDE_OF_WORLD = 7;
  constructor({ playerMovement, hitbox, world }) {
    this.playerMovement = playerMovement;
    this.hitbox = hitbox;
    this.world = world;
  }

  update() {
    this.checkForHorizontalCanvasCollision();
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width >=
      this.world.width
    ) {
      this.playerMovement.position.x = this.world.width - this.hitbox.width / 2;
    }
    if (this.playerMovement.position.x < CanvasPlayerCollision.LEFT_SIDE_OF_WORLD) {
      console.log(this.playerMovement.position.x);
      this.playerMovement.position.x = CanvasPlayerCollision.LEFT_SIDE_OF_WORLD;
    }
  }
}

export default CanvasPlayerCollision;
