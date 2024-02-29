import eventManager from "../core/EventManager.js";

class PlayerDataManager {
  constructor() {
    this.state = {
      zero: 0,
      coins: 0,
      lives: 2,
      maxLives: 3,
      rocks: 2,
      rockLimit: 5,
      gravity: 0.2,
    };

    this.savedPlayerData = null;

    eventManager.on("coinCollected", this.handleCoinCollected.bind(this));
    eventManager.on("getCoinCount", this.getCoinCount.bind(this));
    eventManager.on("rockCollected", this.handleRockCollected.bind(this));
    eventManager.on("getRockCount", this.getRockCount.bind(this));
    eventManager.on("heartCollected", this.handleHeartCollected.bind(this));
    eventManager.on("getLivesCount", this.getLivesCount.bind(this));
    eventManager.on("loseLife", this.handleLoseLife.bind(this));
    eventManager.on("compareData", this.compareData.bind(this));
    eventManager.on("checkThrowRock", this.canThrowRock.bind(this));
    eventManager.on("savePlayerData", this.savePlayerData.bind(this));
    eventManager.on("getPlayerData", this.getPlayerData.bind(this));
  }

  getLivesCount(callback) {
    callback(this.state.lives);
  }

  getRockCount(callback) {
    callback(this.state.rocks);
  }
  getCoinCount(callback) {
    callback(this.state.coins);
  }

  savePlayerData() {
    this.savedPlayerData = this.state;
  }

  getPlayerData() {
    eventManager.emit("sendSavedPlayerData", this.savedPlayerData);
  }

  handleCoinCollected(amount) {
    this.set("coins", this.get("coins") + amount);
    eventManager.emit("updateCoinDisplay", this.get("coins"));
  }

  handleLoseLife() {
    const newLives = this.get("lives") - 1;
    this.set("lives", newLives >= 0 ? newLives : 0);
    eventManager.emit("updateLivesDisplay", this.get("lives"));
  }

  handleHeartCollected() {
    const newHeartCount = this.get("lives") + 1;
    this.set("lives", newHeartCount <= this.state.maxLives ? newHeartCount : this.state.maxLives);
    eventManager.emit("updateLivesDisplay", this.get("lives"));
  }

  handleRockCollected() {
    const newRockCount = this.get("rocks") + 1;
    if (newRockCount <= this.state.rockLimit) {
      this.set("rocks", newRockCount);
      eventManager.emit("updateRockDisplay", this.get("rocks"));
    }
  }

  canThrowRock(callback) {
    const canThrow = this.get("rocks") > 0;
    callback(canThrow);
    if (canThrow) {
      this.handleThrowRock();
    }
  }

  handleThrowRock() {
    const newRockCount = this.get("rocks") - 1;
    if (newRockCount >= 0) {
      this.set("rocks", newRockCount);
      eventManager.emit("updateRockDisplay", this.get("rocks"));
    }
  }

  compareData({ data, callback }) {
    const result = this.state[data[0]] < this.state[data[1]];
    callback(result);
}

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
  }

  reset() {
    this.state = {
      coins: 0,
      lives: 3,
      rocks: 2,
      rockLimit: 5,
      maxLives: 3,
    };
    eventManager.emit("resetPlayerData", this.state);
  }
}

export default PlayerDataManager;
