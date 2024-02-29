import eventManager from "../core/EventManager.js";
import Sprite from "../core/Sprite.js";

class CoinCounter extends Sprite {
  constructor(position, imageSrc) {
    super({ position, imageSrc, frameCount: 8, frameBuffer: 6, scale: 3 });
    this.coins = null;
    eventManager.emit("getCoinCount", (count) => {
      this.coins = count;
    });
    eventManager.on("updateCoinDisplay", this.updateCoinDisplay.bind(this));
  }

  updateCoinDisplay(count) {
    this.coins = count;
  }

  draw(c) {
    super.draw();
    c.font = "20px Arial";
    c.fillStyle = "white";
    c.fillText(
      `x ${this.coins}`,
      this.position.x + this.width / 2,
      this.position.y + this.height / 4
    );
  }

  update() {
    super.update();
  }
}

class HeartLifeCounter extends Sprite {
  constructor(position, imageSrc) {
    super({ position, imageSrc, frameCount: 3, frameBuffer: 12, scale: 2 });
    this.position.x = position.x;
    this.health = null;
    eventManager.emit("getLivesCount", (count) => {
      this.health = count;
    });
    eventManager.on("updateLivesDisplay", this.updateLivesDisplay.bind(this));
  }

  updateLivesDisplay(count) {
    this.health = count;
  }

  draw() {
    const originalX = this.position.x;
    for (let i = 0; i < this.health; i++) {
      this.position.x = originalX + i * (this.width + 20);
      super.draw();
    }
    this.position.x = originalX;
  }
  
  update() {
    super.update();
  }
}

class RockCounter extends Sprite {
  constructor(position, imageSrc) {
    super({ position, imageSrc, scale: 4 });
    this.rocks = null;
    eventManager.emit("getRockCount", (count) => {
      this.rocks = count;
    });
    eventManager.on("updateRockDisplay", this.updateRockDisplay.bind(this));
  }

  updateRockDisplay(count) {
    this.rocks = count;
  }

  draw(c) {
    super.draw();
    c.font = "20px Arial";
    c.fillStyle = "white";
    c.fillText(
      `x ${this.rocks}`,
      this.position.x + this.width / 1.5,
      this.position.y + this.height / 2.5
    );
  }
  update() {
    super.update();
  }
}

export { CoinCounter, HeartLifeCounter, RockCounter };
