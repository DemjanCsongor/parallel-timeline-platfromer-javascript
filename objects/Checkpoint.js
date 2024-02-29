import Sprite from "../core/Sprite.js";
import HitboxComponent from "../components/HitboxComponent.js";
import eventManager from "../core/EventManager.js";

class Checkpoint extends Sprite {
  constructor(options) {
    super(options);
    this.hitbox = new HitboxComponent(
      options.hitboxWidth,
      options.hitboxHeight
    );
    this.hitbox.setHitbox(
      this.position,
      this.hitboxOffsetX,
      this.hitboxOffsetY
    );
  }

  activate(index) {
    eventManager.emit("checkpointActivated", index);
    eventManager.emit("savePlayerData");
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }
}

export default Checkpoint;
