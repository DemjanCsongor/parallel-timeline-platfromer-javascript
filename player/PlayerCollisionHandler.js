import PlatformPlayerCollision from "../collision/PlatformPlayerCollision.js";
import ItemPlayerCollision from "../collision/ItemPlayerCollision.js";
import CanvasPlayerCollision from "../collision/CanvasPlayerCollision.js";
import CheckpointPlayerCollision from "../collision/CheckpointPlayerCollision.js";
import HitboxComponent from "../components/HitboxComponent.js";
import canvasManager from "../core/CanvasManager.js";

class PlayerCollisionHandler {
  constructor({ playerMovement, platforms, items, checkpoints, world }) {
    this.c = canvasManager.getContext(); // TESTING
    this.playerMovement = playerMovement;
    this.platforms = platforms;
    this.items = items;
    this.checkpoints = checkpoints;
    this.world = world;
    this.hitbox = new HitboxComponent(10.5, 13);
    this.hitbox.setHitbox(this.playerMovement.position, -1, 1);
    this.itemPlayerCollision = new ItemPlayerCollision({
      hitbox: this.hitbox,
      items: this.items,
    });
    this.platformPlayerCollision = new PlatformPlayerCollision({
      playerMovement: this.playerMovement,
      hitbox: this.hitbox,
      platforms: this.platforms,
    });
    this.canvasPlayerCollision = new CanvasPlayerCollision({
      playerMovement: this.playerMovement,
      hitbox: this.hitbox,
      world: this.world,
    });
    this.checkpointPlayerCollision = new CheckpointPlayerCollision({
      hitbox: this.hitbox,
      checkpoints: this.checkpoints,
    });
    console.log(
      this.checkpointPlayerCollision,
      this.canvasPlayerCollision,
      this.platformPlayerCollision
    );
  }

  update() {
    this.updateHitbox();
    this.platformPlayerCollision.update();
    this.updateHitbox();
    this.canvasPlayerCollision.update();
    this.itemPlayerCollision.update();
    this.checkpointPlayerCollision.update();
    this.updateHitbox();
  }

  draw() {
    this.hitbox.drawHitbox();
  }

  updateHitbox() {
    this.hitbox.setHitbox(this.playerMovement.position, -1, 1);
  }
}

export default PlayerCollisionHandler;
