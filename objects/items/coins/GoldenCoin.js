import Item from "../Item.js";
import eventManager from "../../../core/EventManager.js";

class GoldenCoin extends Item {
  constructor(options) {
    super({
      ...options,
      imageSrc: "../../../img/items/coin_gold.png",
      frameCount: 8,
      frameBuffer: 6,
      hitboxWidth: 12,
      hitboxHeight: 12,
    });
    this.value = 2;
  }

  collect() {
    eventManager.emit("coinCollected", this.value);
  }
}

export default GoldenCoin;
