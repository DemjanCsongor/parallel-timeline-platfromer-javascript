import canvasManager from "../core/CanvasManager.js";

class BaseGameState {
  constructor() {
    this.c = canvasManager.getContext();
    this.canvas = canvasManager.getCanvas();
  }

  update() {
    console.error("update() should be overridden in all game states.");
  }

  draw() {
    console.error("draw() should be overridden in all game states.");
  }
}

export default BaseGameState;
