import Item from "./Item.js";
import eventManager from "../../../core/EventManager.js";

class Heart extends Item {
  constructor(options) {
    super({
      ...options,
      imageSrc: "../../../img/items/heart.png",
      frameCount: 3,
      frameBuffer: 9,
      hitboxWidth: 12,
      hitboxHeight: 12,
    });
  }

  collect() {
    eventManager.emit("heartCollected");
  }
}

export default Heart;
