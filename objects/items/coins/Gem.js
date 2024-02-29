import Item from "../Item.js";
import eventManager from "../../../core/EventManager.js";

class Gem extends Item {
  constructor(options) {
    super({
      ...options,
      imageSrc: "../../../img/items/gem.png",
      frameCount: 5,
      frameBuffer: 5,
      hitboxWidth: 12,
      hitboxHeight: 12,
    });
    this.value = 4;
  }

  collect() {
    eventManager.emit("coinCollected", this.value);
  }
}

export default Gem;
