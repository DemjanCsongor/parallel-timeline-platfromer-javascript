import eventManager from "../../core/EventManager.js";
import input from "../../core/Input.js";
import canvasManager from "../../core/CanvasManager.js";

class TimelineDisplay {
  constructor({ checkpointManager, camera }) {
    this.c = canvasManager.getContext();
    this.camera = camera;
    this.checkpointManager = checkpointManager;
    this.active = false;
    this.selectedCheckpointIndex = 0;
    this.visitedCheckpoints = [];
    this.checkpointRadius = 4;
    this.timeline = 0;

    eventManager.on(
      "sendVisitedCheckpoints",
      this.updateVisitedCheckpoints.bind(this)
    );
    eventManager.on(
      "toggleTimelineDisplay",
      this.toggleTimelineDisplay.bind(this)
    );
  }

  updateVisitedCheckpoints(data) {
    this.visitedCheckpoints = data;
  }

  toggleTimelineDisplay(result) {
    this.active = result;
  }

  getSelectedCheckpoint() {
    eventManager.emit("getVisitedCheckpoints");
  }

  handleTimelineNavigation() {
    if (input.wasActionPressed("timeLineRight")) {
      this.selectedCheckpointIndex = (this.selectedCheckpointIndex + 1) % this.visitedCheckpoints.length;
    } else if (input.wasActionPressed("timeLineLeft")) {
      this.selectedCheckpointIndex = (this.selectedCheckpointIndex - 1 + this.visitedCheckpoints.length) % this.visitedCheckpoints.length;
    }
  }

  handleCheckpointSelection() {
    if (input.wasActionPressed("timeLineGo")) {
      const selectedCheckpoint = this.visitedCheckpoints[this.selectedCheckpointIndex];
      const checkpointIndex = this.checkpointManager.checkpoints.indexOf(selectedCheckpoint);

      this.timeline = selectedCheckpoint === this.visitedCheckpoints[this.visitedCheckpoints.length - 1] ? 0 : this.timeline + 1;
      eventManager.emit("checkpointSelected", checkpointIndex, this.timeline);
      eventManager.emit("sendJustTeleportedCheckpoint", checkpointIndex);

      this.toggleTimelineDisplay();
    }
  }

  drawCheckpoint(index, x, y) {
    this.c.fillStyle = index === this.selectedCheckpointIndex ? "green" : "black";
    this.c.beginPath();
    this.c.arc(x, y, this.checkpointRadius, 0, Math.PI * 2);
    this.c.fill();
    this.c.closePath();

    this.drawCheckpointLabel(index, x, y);
  }

  drawCheckpointLabel(index, x, y) {
    this.c.font = "14px Arial";
    this.c.fillStyle = "white";
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.fillText(index.toString(), x, y);
  }

  update() {
    this.getSelectedCheckpoint();
    if (!this.active) return;

    this.handleTimelineNavigation();
    this.handleCheckpointSelection();
  }

  draw() {
    if (!this.active) return;
    const viewport = this.camera.getViewport();
    const barY = viewport.y + viewport.height / 2;
    const barWidth = viewport.width * 0.8;
    const barX = viewport.x + (viewport.width - barWidth) / 2;

    this.c.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.c.fillRect(barX, barY - 15, barWidth, 30);

    const checkpointSpacing = barWidth / Math.max(1, this.visitedCheckpoints.length - 1);
    this.visitedCheckpoints.forEach((_, index) => {
      const x = barX + index * checkpointSpacing;
      this.drawCheckpoint(index, x, barY);
    });
  }
}

export default TimelineDisplay;
