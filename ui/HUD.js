import eventManager from "../core/EventManager.js";
import { CoinCounter, HeartLifeCounter, RockCounter } from "./Counter.js";
import canvasManager from "../core/CanvasManager.js";

class HUD {
  constructor() {
    this.c = canvasManager.getContext();
    this.coinCounter = new CoinCounter(
      { x: 300, y: 30 },
      "../img/items/coin_gold.png"
    );
    this.heartLifeCounter = new HeartLifeCounter(
      { x: 30, y: 30 },
      "../img/items/heart.png"
    );
    this.rockCounter = new RockCounter(
      { x: 200, y: 30 },
      "../img/items/Rock1.png"
    );
  }

  draw() {
    this.coinCounter.draw(this.c);
    this.heartLifeCounter.draw(this.c);
    this.rockCounter.draw(this.c);
  }

  update() {
    this.coinCounter.update();
    this.heartLifeCounter.update();
    this.rockCounter.update();
  }
}

export default HUD;
