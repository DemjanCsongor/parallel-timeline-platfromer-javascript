import Platform from "./Platform.js";
import canvasManager from "../../core/CanvasManager.js";

class DisappearingPlatform extends Platform {
  constructor({ disappearDelay, ...options }) {
    super(options);
    this.disappearDelay = disappearDelay;
    this.alpha = 1;
    this.c = canvasManager.getContext();
  }

  startDisappearTimer(onDisappearCallback) {
    setTimeout(() => {
      this.alpha = 0;
      onDisappearCallback();
    }, this.disappearDelay);
  }

  update() {
    super.update();
  }

  draw() {
    if (this.alpha === 0) return;
    this.c.globalAlpha = this.alpha;
    super.draw();
    this.c.globalAlpha = 1;
  }
}

export default DisappearingPlatform;
