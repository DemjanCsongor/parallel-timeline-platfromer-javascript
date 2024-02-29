import Sprite from "../../core/Sprite.js";
import HitboxComponent from "../../components/HitboxComponent.js";

class Item extends Sprite {
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

  collect() {
    console.error("collect() should be overridden in all items.");
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }
}

export default Item;
