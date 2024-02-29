import Sprite from "../../core/Sprite.js";
import HitboxComponent from "../../components/HitboxComponent.js";

class Platform extends Sprite {
  constructor(options) {
    super(options);
    this.type = options.type;
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

  update() {
    super.update();
    this.hitbox.setHitbox(
      this.position,
      this.hitboxOffsetX,
      this.hitboxOffsetY
    );
  }

  draw() {
    super.draw();
    // this.hitbox.drawHitbox();
  }
}

export default Platform;
