import { collision } from "../utils/utils.js";
import Heart from "../objects/items/Heart.js";
import Rock from "../objects/items/Rock.js";
import eventManager from "../core/EventManager.js";

class ItemPlayerCollision {
  constructor({ hitbox, items }) {
    this.hitbox = hitbox;
    this.items = items;
  }

  checkPlayerItemCollisions() {
    this.items.forEach((item, index) => {
      if (collision({ object1: this.hitbox, object2: item })) {
        console.log("collision detected with item");
        const handleCollect = (canCollect) => {
          if (canCollect) {
            item.collect();
            this.items.splice(index, 1);
          }
        };
        if (item instanceof Heart) {
          eventManager.emit("compareData", {
            data: ["lives", "maxLives"],
            callback: handleCollect,
          });
        } else if (item instanceof Rock) {
          eventManager.emit("compareData", {
            data: ["rocks", "rockLimit"],
            callback: handleCollect,
          });
        } else {
          item.collect();
          this.items.splice(index, 1);
        }
      }
    });
  }

  update() {
    this.checkPlayerItemCollisions();
  }
}

export default ItemPlayerCollision;
