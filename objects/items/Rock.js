import canvasManager from "../../core/CanvasManager.js";
import Item from "./Item.js";
// import playerDataManagerInstance from "../../data/PlayerDataManager.js";
import eventManager from "../../../core/EventManager.js";

class Rock extends Item {
  constructor(options) {
    super({
      ...options,
      imageSrc: "../../../img/items/Rock1.png",
    });
    this.state = "collectible";
    this.c = canvasManager.getContext();
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.1;
    this.toBeRemoved = false;
  }

  makeThrowable(direction) {
    this.state = "thrown";
    this.velocity.x = 5 * direction;
    this.velocity.y = -2;
  }

  collect() {
    if (this.state === "collectible") {
      eventManager.emit("rockCollected");
    }
  }

  update() {
    if (this.state === "thrown") {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.y += this.gravity;

      if (
        this.position.x < 0 ||
        this.position.x > this.c.canvas.width ||
        this.position.y > this.c.canvas.height
      ) {
        eventManager.emit("removeGameObject", this);
      }
    }
  }

  draw() {
    super.draw();
  }
}

export default Rock;
