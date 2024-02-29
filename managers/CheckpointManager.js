import eventManager from "../core/EventManager.js";

class CheckpointManager {
  constructor({ checkpoints, visitedCheckpoints = [] }) {
    this.checkpoints = checkpoints;
    this.visitedCheckpoints = visitedCheckpoints;
    this.activeCheckpoint = null;
    
    this.visitedCheckpoints.push(this.checkpoints[0]);
    this.activeCheckpoint = this.checkpoints[0];

    eventManager.on("checkpointActivated", this.activateCheckpoint.bind(this));
    eventManager.on(
      "getActiveCheckpoint",
      this.sendActiveCheckpoint.bind(this)
    );
    eventManager.on(
      "getVisitedCheckpoints",
      this.sendVisitedCheckpoints.bind(this)
    );
    eventManager.on("checkpointSelected", this.checkpointSelected.bind(this));
    eventManager.on("requestLastActiveCheckpoint", this.handleLastActiveCheckpoint.bind(this));
  }

  handleLastActiveCheckpoint(callback) {
      callback(this.activeCheckpoint.position);
  }

  checkpointSelected(index) {
    const checkpoint = this.checkpoints[index];
    this.activeCheckpoint = checkpoint;
  }

  addCheckpoint(checkpoint) {
    this.checkpoints.push(checkpoint);
  }

  activateCheckpoint(index) {
    const checkpoint = this.checkpoints[index];

    this.activeCheckpoint = checkpoint;
    if (!this.visitedCheckpoints.includes(checkpoint)) {
      this.addVisitedCheckpoint(checkpoint);
      console.log("checkpoint activated", checkpoint)
    }
  }

  addVisitedCheckpoint(checkpoint) {
    this.visitedCheckpoints.push(checkpoint);
  }

  sendActiveCheckpoint() {
    eventManager.emit("sendActiveCheckpoint", this.activeCheckpoint);
  }

  // Method to get all visited checkpoints
  sendVisitedCheckpoints() {
    eventManager.emit("sendVisitedCheckpoints", this.visitedCheckpoints);
  }
}

export default CheckpointManager;
