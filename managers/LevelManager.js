import Level1 from "../levels/Level1.js";
import eventManager from "../core/EventManager.js";
import PlayerDataManager from "../player/PlayerDataManager.js";
import Player from "../player/Player.js";

class LevelManager {
  constructor(levels) {
    this.levels = levels;
    this.currentLevelIndex = 0;
    this.nextLevelId = 1;
  }

  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  nextLevel() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      this.levels[this.currentLevelIndex].initLevel();
    } else {
      console.log("No more levels.");
    }
  }

  resetLevel() {
    this.levels[this.currentLevelIndex].initLevel();
  }

  duplicateCurrentLevel(playerPosition) {
    const currentLevel = this.getCurrentLevel();

    const newLevel = new Level1({
      playerPosition: playerPosition,
      levelId: this.nextLevelId++,
      isDuplicate: true,
    });
    this.levels.push(newLevel);
    newLevel.initLevel();
    newLevel.checkpoints = [...currentLevel.checkpoints];
    
    eventManager.emit("savePlayerData");

    const newPlayerDataManager = new PlayerDataManager();
    eventManager.on("sendSavedPlayerData", (savedData) => {
      Object.assign(newPlayerDataManager.state, savedData);
    });
    eventManager.emit("getPlayerData");
    const newPlayer = new Player({
      level: newLevel,
      playerDataManager: newPlayerDataManager,
    });

    return { newLevel, newPlayer };
  }
}

export default LevelManager;
