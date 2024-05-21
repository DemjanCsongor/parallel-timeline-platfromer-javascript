import BaseGameState from "./BaseGameState.js";
import gameStateManager from "../managers/GameStateManager.js";
import input from "../core/Input.js";
import Player from "../player/Player.js";
import CheckpointManager from "../managers/CheckpointManager.js";
import Camera from "../scene/Camera.js";
import TimelineDisplay from "../scene/timelineDisplay/TimelineDisplay.js";
import HUD from "../ui/HUD.js";
import eventManager from "../core/EventManager.js";
import { clonePosition } from "../utils/utils.js";

class PlayingState extends BaseGameState {
  constructor(levelManager) {
    super();
    this.levelManager = levelManager;
    this.currentLevel = this.levelManager.getCurrentLevel();
    this.checkpointManager = new CheckpointManager({
      checkpoints: this.currentLevel.checkpoints,
    });
    this.player = new Player({
      level: this.currentLevel,
    });
    this.camera = new Camera({
      world: this.currentLevel.world,
      canvas: this.canvas,
      scale: 4,
    });
    this.timelineDisplay = new TimelineDisplay({
      checkpointManager: this.checkpointManager,
      camera: this.camera,
    });
    this.camera.follow(this.player.playerMovement);
    eventManager.on("checkpointSelected", this.switchTimeline.bind(this));
    eventManager.on("requestGameOver", this.handleGameOver.bind(this));
    this.hud = new HUD();
  }

  update() {
    this.currentLevel.update();
    this.player.update();
    this.timelineDisplay.update();
    this.camera.update(this.player.playerMovement);
    this.hud.update();

    this.handlePause();
  }

  draw() {
    this.c.save();
    this.c.scale(this.camera.scale, this.camera.scale);
    this.c.translate(-this.camera.position.x, -this.camera.position.y);

    this.currentLevel.draw();
    this.player.draw();
    this.timelineDisplay.draw();

    this.c.restore();

    this.hud.draw();
  }

  handlePause() {
    if (input.wasActionPressed("pause")) {
      gameStateManager.switchToState("paused");
    }
  }

  handleGameOver() {
    gameStateManager.switchToState("gameOver");
  }

  setTimeline(targetLevelIndex) {
    this.levelManager.currentLevelIndex = targetLevelIndex;
    // const visitedCheckpoints = this.checkpointManager.visitedCheckpoints;
    this.currentLevel = this.levelManager.getCurrentLevel();
    this.checkpointManager = new CheckpointManager({
      checkpoints: this.currentLevel.checkpoints,
      // visitedCheckpoints: visitedCheckpoints,
    });
    this.player.level = this.currentLevel;
    this.camera.world = this.currentLevel.world;
  }

  switchTimeline(checkpointIndex, targetLevelIndex) {
    const furthestCheckpointIndex =
      this.checkpointManager.visitedCheckpoints.length - 1;

    const selectedCheckpoint = this.currentLevel.checkpoints[checkpointIndex];

    if (checkpointIndex === furthestCheckpointIndex) {
      this.setTimeline(0);
    } else {
      const { newLevel, newPlayer, visitedCheckpoints } = this.levelManager.duplicateCurrentLevel(
        clonePosition(selectedCheckpoint.position)
      );
      if (!newLevel || !newPlayer) {
        console.error("Failed to create new level or player");
        return;
      }
      this.player = newPlayer;
      this.player.updatePosition(this.player.playerMovement.position);
      targetLevelIndex = this.levelManager.levels.length - 1;
      this.setTimeline(targetLevelIndex);
    }

    // console.log("teleporting to", selectedCheckpoint.position);
    this.camera.moveTo(
      selectedCheckpoint.position.x,
      selectedCheckpoint.position.y
    );
  }
}

export default PlayingState;
