import PlayerMovement from "./PlayerMovement.js";
import PlayerAnimation from "./PlayerAnimation.js";
import PlayerCollisionHandler from "./PlayerCollisionHandler.js";
import PlayerDataManager from "./PlayerDataManager.js";
import eventManager from "../core/EventManager.js";
import { clonePosition } from "../utils/utils.js";

class Player {
  constructor({ level, playerDataManager = null }) {
    this.level = level;
    this.playerDataManager = playerDataManager || new PlayerDataManager();
    console.log("player start position", this.level.playerStartPosition);
    this.playerMovement = new PlayerMovement(this.level.playerStartPosition);
    this.playerCollisionHandler = new PlayerCollisionHandler({
      playerMovement: this.playerMovement,
      platforms: this.level.platforms,
      items: this.level.items,
      checkpoints: this.level.checkpoints,
      world: this.level.world,
    });
    this.playerAnimation = new PlayerAnimation({
      position: this.playerMovement.position,
      imageSrc: "../../img/pinkMonster/Idle.png",
      frameCount: 4,
    });
  }

  update() {
    this.playerMovement.update();
    this.playerAnimation.update();
    this.playerCollisionHandler.update();
    this.handleLoseLife();
  }

  draw() {
    this.playerAnimation.draw();
    // this.playerCollisionHandler.draw();
  }

  updatePosition(newPosition) {
    this.playerMovement.updatePosition(newPosition);
    this.playerAnimation.updatePosition(newPosition);
  }

  handleLoseLife() {
    console.log(this.playerDataManager.state.lives);
    if (this.playerMovement.position.y > this.level.world.height) {
      if (this.playerDataManager.state.lives === 1) {
        eventManager.emit("requestGameOver");
      } else {
        this.playerDataManager.handleLoseLife();
        eventManager.emit(
          "requestLastActiveCheckpoint",
          (checkpointPosition) => {
            const clonedPosition = clonePosition(checkpointPosition);
            this.updatePosition(clonedPosition);
          }
        );
      }
    }
  }
}

export default Player;
