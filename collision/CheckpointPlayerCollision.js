import { collision } from "../utils/utils.js";
import eventManager from "../core/EventManager.js";

class CheckpointPlayerCollision {
  constructor({ hitbox, checkpoints }) {
    this.hitbox = hitbox;
    this.checkpoints = checkpoints;
    this.activeCheckpoint = null;
    this.justTeleported = null;

    eventManager.on(
      "sendActiveCheckpoint",
      this.getActiveCheckpoint.bind(this)
    );
    eventManager.on(
      "sendJustTeleportedCheckpoint",
      this.setJustTeleported.bind(this)
    );
  }

  setJustTeleported(index) {
    this.justTeleported = index;
  }

  getActiveCheckpoint(activeCheckpoint) {
    this.activeCheckpoint = activeCheckpoint;
  }

  getCheckPointIndex(checkpoint) {
    return this.checkpoints.indexOf(checkpoint);
  }

  checkPlayerCheckpointCollisions() {
    eventManager.emit("getActiveCheckpoint");
    let collided = false;

    this.checkpoints.forEach((checkpoint, index) => {
      if (collision({ object1: this.hitbox, object2: checkpoint })) {
        collided = true;

        console.log(index);
        if (index === 0 || index === this.justTeleported) {
          eventManager.emit("toggleTimelineDisplay", false);
          return;
        }
        if (checkpoint == this.activeCheckpoint) {
          eventManager.emit("toggleTimelineDisplay", true);
        } else {
          checkpoint.activate(index);
          eventManager.emit("toggleTimelineDisplay", true);
        }
      }
    });

    if (!collided) {
      eventManager.emit("toggleTimelineDisplay", false);
    }
  }

  update() {
    this.checkPlayerCheckpointCollisions();
  }
}

export default CheckpointPlayerCollision;
