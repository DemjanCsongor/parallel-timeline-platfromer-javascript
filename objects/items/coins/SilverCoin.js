import Item from "../Item.js";
import eventManager from "../../../core/EventManager.js";

class SilverCoin extends Item {
  constructor(options) {
    super({
      ...options,
      imageSrc: "../../../img/items/coin_silver.png",
      frameCount: 8,
      frameBuffer: 6,
      hitboxWidth: 12,
      hitboxHeight: 12,
    });
    this.value = 1;
  }

  collect() {
    eventManager.emit("coinCollected", this.value);
  }
}

export default SilverCoin;
